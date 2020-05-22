package trippy.web.controllers;

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

import java.io.IOException;
import java.security.Principal;

@Controller
@RequestMapping("/api/user")
public class UserController {

    private final CarService carService;
    private final ModelMapper modelMapper;
    private final ImageUtil imageUtil;
    private final ImageService imageService;

    public UserController(CarService carService, ModelMapper modelMapper, ImageUtil imageUtil, ImageService imageService) {
        this.carService = carService;
        this.modelMapper = modelMapper;
        this.imageUtil = imageUtil;
        this.imageService = imageService;
    }

    //TODO validation
    @RequestMapping(method = RequestMethod.POST, path = "/create-car")
    public ResponseEntity<CarCreatedViewModel> createCar(@RequestBody CarCreateBindingModel car, Principal principal) {
        String ownerUsername = principal.getName();
        CarServiceModel created = this.carService.createCar(this.modelMapper.map(car, CarServiceModel.class), ownerUsername);
        CarCreatedViewModel carCreatedViewModel = this.modelMapper.map(created, CarCreatedViewModel.class);

        return new ResponseEntity<>(carCreatedViewModel, HttpStatus.CREATED);
    }

    //TODO splice the two methods into one
    @RequestMapping(method = RequestMethod.POST, path = "/upload/car-image", consumes = "multipart/form-data")
    public ResponseEntity image(@RequestParam("file") MultipartFile carImage, @RequestParam("carId") String carId) throws IOException {
//        ImageUploadRes uploadResponse = this.imageUtil.uploadImage(carImage);
//        Image image = this.imageService.saveImage(uploadResponse);
//        this.carService.setCarImage(carId, image);
        String contentType = carImage.getContentType();


        return ResponseEntity.ok(true);
    }
}