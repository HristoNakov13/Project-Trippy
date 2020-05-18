package trippy.web.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import trippy.domain.models.binding.UserSignUpBindingModel;
import trippy.domain.models.binding.availabilitycheck.EmailCheckBindingModel;
import trippy.domain.models.binding.availabilitycheck.UsernameCheckBindingModel;
import trippy.domain.models.service.UserServiceModel;
import trippy.services.UserService;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;

import java.util.ArrayList;
import java.util.List;

import static trippy.util.constants.UserValidationConstants.ERROR_RESPONSE_TITLE;
import static trippy.util.constants.UserValidationConstants.ERROR_RESPONSE_TYPE;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final ValidatorUtil validatorUtil;
    private final ModelMapper modelMapper;

    public AuthController(UserService userService, ValidatorUtil validatorUtil, ModelMapper modelMapper) {
        this.userService = userService;
        this.validatorUtil = validatorUtil;
        this.modelMapper = modelMapper;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/availability-check/username")
    public ResponseEntity<Boolean> usernameCheckAvailability(@RequestBody UsernameCheckBindingModel usernameBindingModel) {
        if (usernameBindingModel.getUsername() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean isTaken = this.userService.isTakenUsername(usernameBindingModel.getUsername());

        return ResponseEntity.ok(isTaken);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/availability-check/email")
    public ResponseEntity<Boolean> emailCheckAvailability(@RequestBody EmailCheckBindingModel emailBindingModel) {
        if (emailBindingModel.getEmail() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        boolean isTaken = this.userService.isTakenEmail(emailBindingModel.getEmail());

        return ResponseEntity.ok(isTaken);
    }

    //this looks absolutely disgusting but at least it werks
    //TODO refactor down the road
    @RequestMapping(method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<UserSignUpBindingModel> signUpUser(@RequestBody UserSignUpBindingModel userBindingModel) {
        List<ValidationError> errors = this.validatorUtil.getErrors(userBindingModel);

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse(ERROR_RESPONSE_TITLE, ERROR_RESPONSE_TYPE, errors);

            return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
        }

        try {
            this.userService.signUp(this.modelMapper.map(userBindingModel, UserServiceModel.class));
            return ResponseEntity.ok(userBindingModel);

        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse(
                    ERROR_RESPONSE_TITLE,
                    ERROR_RESPONSE_TYPE,
                    this.extractErrors(e.getMessage())
            );

            return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    private List<ValidationError> extractErrors(String errorMessage) {
        String[] msgSplit = errorMessage.split("\\s+\\|\\s+");

        String[] properties = msgSplit[0]
                .replace("property: ", "")
                .split(",\\s+");

        String[] messages = msgSplit[1]
                .replace("message: ", "")
                .split(",\\s+");

        List<ValidationError> validationErrors = new ArrayList<>();

        for (int i = 0; i < properties.length; i++) {
            ValidationError error = new ValidationError();
            error.setProperty(properties[i]);
            error.setMessage(messages[i]);

            validationErrors.add(error);
        }

        return validationErrors;
    }
}
