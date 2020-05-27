package trippy.web.controllers;

import com.google.gson.Gson;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.entities.Car;
import trippy.domain.entities.Image;
import trippy.domain.entities.User;
import trippy.domain.models.binding.car.CarCreateBindingModel;
import trippy.domain.models.binding.car.CarDeleteBindingModel;
import trippy.domain.models.binding.car.CarGetBindingModel;
import trippy.domain.models.service.CarServiceModel;
import trippy.domain.models.view.cars.CarCreatedViewModel;
import trippy.domain.models.view.cars.CarDetailsViewModel;
import trippy.domain.models.view.cars.CarListViewModel;
import trippy.repositories.CarRepository;
import trippy.services.CarService;
import trippy.services.ImageService;
import trippy.services.UserService;
import trippy.util.images.ImageUploadRes;
import trippy.util.images.ImageUtil;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;

import javax.persistence.EntityNotFoundException;
import javax.security.auth.login.CredentialNotFoundException;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static trippy.util.constants.CarValidationConstants.ERROR_RESPONSE_TITLE;

@Controller
@RequestMapping("/api/user")
public class CarController {

    private final CarService carService;
    private final ModelMapper modelMapper;
    private final ImageUtil imageUtil;
    private final ImageService imageService;
    private final Gson gson;
    private final ValidatorUtil validatorUtil;
    private final UserService userService;

    public CarController(CarService carService, ModelMapper modelMapper, ImageUtil imageUtil, ImageService imageService, Gson gson, ValidatorUtil validatorUtil, UserService userService, CarRepository carRepository) {
        this.carService = carService;
        this.modelMapper = modelMapper;
        this.imageUtil = imageUtil;
        this.imageService = imageService;
        this.gson = gson;
        this.validatorUtil = validatorUtil;
        this.userService = userService;

        this.init();
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

    @RequestMapping(method = RequestMethod.GET, path = "/cars")
    public ResponseEntity<?> getUserCars(Principal principal) {
        Set<Car> cars;
        try {
            cars = this.userService.getUserCarsByUsername(principal.getName());
        } catch (CredentialNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setTitle(e.getMessage());

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        Set<CarListViewModel> carViewModels = cars
                .stream()
                .map(car -> this.modelMapper.map(car, CarListViewModel.class))
                .collect(Collectors.toSet());

        return ResponseEntity.ok(carViewModels);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/cars/details")
    public ResponseEntity<?> getCar(@RequestBody CarGetBindingModel carGetBindingModel) {
        Car carEntity;
        try {
            carEntity = this.carService.getCarById(carGetBindingModel.getId());
        } catch (EntityNotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setTitle("Invalid id. No such car exists.");

            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(this.modelMapper.map(carEntity, CarDetailsViewModel.class));
    }

    //not sure if its a good idea to return 403 if the sender is not the owner of target car
    @RequestMapping(method = RequestMethod.DELETE, path = "/cars/delete")
    public ResponseEntity<?> deleteCar(Authentication authentication, @RequestBody CarDeleteBindingModel carDeleteBindingModel) {
        User owner = (User) authentication.getPrincipal();
        this.carService.deleteCar(owner.getId(), carDeleteBindingModel.getId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //adds TypeMaps to modelMapper
    private void init() {
        Converter<Image, String> imageSrcConverter = (context -> {
            Image img = context.getSource();
            return img == null
                    ? ""
                    : imageUtil.getImageSrc(img.getImgCloudService(), img.getPublicId());
        });

        this.modelMapper.createTypeMap(Car.class, CarListViewModel.class)
                .addMappings(mapper ->
                        mapper.using(imageSrcConverter).map(Car::getImage, CarListViewModel::setImageSrc));

        this.modelMapper.createTypeMap(Car.class, CarDetailsViewModel.class)
                .addMappings(mapper ->
                        mapper.using(imageSrcConverter).map(Car::getImage, CarDetailsViewModel::setImageSrc));
    }
}