package trippy.web.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.models.binding.car.CarCreateBindingModel;
import trippy.domain.models.service.CarServiceModel;
import trippy.domain.models.view.CarCreatedViewModel;
import trippy.services.CarService;

import java.security.Principal;

@Controller
@RequestMapping("/api/user")
public class UserController {

    private final CarService carService;
    private final ModelMapper modelMapper;

    public UserController(CarService carService, ModelMapper modelMapper) {
        this.carService = carService;
        this.modelMapper = modelMapper;
    }

    //TODO validation
    @RequestMapping(method = RequestMethod.POST, path = "/create-car")
    public ResponseEntity<CarCreatedViewModel> createCar(@RequestBody CarCreateBindingModel car, Principal principal) {
        String ownerUsername = principal.getName();
        CarServiceModel created = this.carService.createCar(this.modelMapper.map(car, CarServiceModel.class), ownerUsername);
        CarCreatedViewModel carCreatedViewModel = this.modelMapper.map(created, CarCreatedViewModel.class);

        return new ResponseEntity<>(carCreatedViewModel, HttpStatus.CREATED);
    }

    //TODO integrate cloudinary
    @RequestMapping(method = RequestMethod.POST, path = "/upload/car-image", consumes = "multipart/form-data")
    public ResponseEntity image(@RequestParam("file") MultipartFile carImage, @RequestParam("carId") String carId) {
        System.out.println();

        return ResponseEntity.ok(true);
    }
}