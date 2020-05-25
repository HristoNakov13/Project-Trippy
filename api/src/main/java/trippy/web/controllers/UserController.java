package trippy.web.controllers;

import com.google.gson.Gson;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.entities.Image;
import trippy.domain.models.binding.car.CarCreateBindingModel;
import trippy.domain.models.service.CarServiceModel;
import trippy.domain.models.view.CarCreatedViewModel;
import trippy.services.CarService;
import trippy.services.ImageService;
import trippy.util.images.ImageUploadRes;
import trippy.util.images.ImageUtil;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import static trippy.util.constants.CarValidationConstants.ERROR_RESPONSE_TITLE;

@Controller
@RequestMapping("/api/user")
public class UserController {

    private final CarService carService;
    private final ModelMapper modelMapper;
    private final ImageUtil imageUtil;
    private final ImageService imageService;
    private final Gson gson;
    private final ValidatorUtil validatorUtil;

    public UserController(CarService carService, ModelMapper modelMapper, ImageUtil imageUtil, ImageService imageService, Gson gson, ValidatorUtil validatorUtil) {
        this.carService = carService;
        this.modelMapper = modelMapper;
        this.imageUtil = imageUtil;
        this.imageService = imageService;
        this.gson = gson;
        this.validatorUtil = validatorUtil;
    }

    @RequestMapping(method = RequestMethod.POST, path = "/create-car", consumes = "multipart/form-data")
    public ResponseEntity<?> createCar(@RequestParam(value = "file", required = false) MultipartFile carImage,
                                       @RequestParam(value = "carData") String carData,
                                       Principal principal) throws IOException {
        CarCreateBindingModel carCreateBindingModel = this.gson.fromJson(carData, CarCreateBindingModel.class);
        carCreateBindingModel.setImage(carImage);
        List<ValidationError> errors = this.validatorUtil.getErrors(carCreateBindingModel);

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse(ERROR_RESPONSE_TITLE, errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        CarServiceModel toBeCreated = this.modelMapper.map(carCreateBindingModel, CarServiceModel.class);

        if (carImage != null) {
            ImageUploadRes uploadResponse = this.imageUtil.uploadImage(carImage);
            Image image = this.imageService.saveImage(uploadResponse);
            toBeCreated.setImage(image);
        }

        String ownerUsername = principal.getName();
        CarServiceModel created = this.carService.createCar(toBeCreated, ownerUsername);
        CarCreatedViewModel carCreatedViewModel = this.modelMapper.map(created, CarCreatedViewModel.class);

        return new ResponseEntity<>(carCreatedViewModel, HttpStatus.CREATED);
    }
}