package trippy.web.controllers;

import com.google.gson.Gson;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.entities.Image;
import trippy.domain.entities.User;
import trippy.domain.models.binding.user.UserChangePasswordBindingModel;
import trippy.domain.models.binding.user.UserEditProfileBindingModel;
import trippy.domain.models.view.users.UserMyProfileViewModel;
import trippy.services.ImageService;
import trippy.services.UserService;
import trippy.util.constants.UserValidationConstants;
import trippy.util.images.ImageUploadRes;
import trippy.util.images.ImageUtil;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/user/profile")
public class UserController {

    private final ModelMapper modelMapper;
    private final ValidatorUtil validatorUtil;
    private final Gson gson;
    private final ImageUtil imageUtil;
    private final ImageService imageService;
    private final UserService userService;

    public UserController(ModelMapper modelMapper, ValidatorUtil validatorUtil, Gson gson, ImageUtil imageUtil, ImageService imageService, UserService userService) {
        this.modelMapper = modelMapper;
        this.validatorUtil = validatorUtil;
        this.gson = gson;
        this.imageUtil = imageUtil;
        this.imageService = imageService;
        this.userService = userService;

        this.init();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<UserMyProfileViewModel> userProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(this.modelMapper.map(user, UserMyProfileViewModel.class));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> editUserProfile(Authentication authentication,
                                             @RequestParam(name = "image", required = false) MultipartFile userImage,
                                             @RequestParam(name = "userData") String userData) throws IOException {
        User user = (User) authentication.getPrincipal();
        UserEditProfileBindingModel editedUser = this.gson.fromJson(userData, UserEditProfileBindingModel.class);
        editedUser.setImage(userImage);

        List<ValidationError> errors = this.validatorUtil.getErrors(editedUser);

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse("", errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        BeanUtils.copyProperties(editedUser, user);

        if (userImage != null) {
            ImageUploadRes uploadResponse = this.imageUtil.uploadImage(userImage);
            Image image = this.imageService.saveImage(uploadResponse);
            user.setImage(image);
        }

        this.userService.editUser(user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(path = "/change-password", method = RequestMethod.POST)
    public ResponseEntity<?> changePassword(Authentication authentication, @RequestBody UserChangePasswordBindingModel passwordsModel) {
        User user = (User) authentication.getPrincipal();
        List<ValidationError> errors = this.validatorUtil.getErrors(passwordsModel);

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse(UserValidationConstants.PASSWORD_VALIDATION_TITLE, errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        //cant think of a more elegant way of dealing with the old - new pass mismatching case atm
        if (!this.validatorUtil.isMatchingPasswords(passwordsModel.getOldPassword(), user.getPassword())) {
            ValidationError validationError = new ValidationError();
            validationError.setProperty("oldPassword");
            validationError.setMessage(UserValidationConstants.OLD_NEW_PASSWORDS_MISMATCH);
            errors.add(validationError);
            ErrorResponse errorResponse = new ErrorResponse(UserValidationConstants.PASSWORD_VALIDATION_TITLE, errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        this.userService.changeUserPassword(user, passwordsModel.getNewPassword());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void init() {
        Converter<Image, String> imageSrcConverter = (context -> {
            Image img = context.getSource();
            return img == null
                    ? ""
                    : imageUtil.getImageSrc(img.getImgCloudService(), img.getPublicId());
        });

        this.modelMapper.createTypeMap(User.class, UserMyProfileViewModel.class)
                .addMappings(mapping ->
                        mapping.using(imageSrcConverter).map(User::getImage, UserMyProfileViewModel::setImageSrc));
    }
}
