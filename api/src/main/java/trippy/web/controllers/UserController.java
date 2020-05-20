package trippy.web.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import trippy.domain.models.binding.car.CarCreateBindingModel;

@Controller
@RequestMapping("/api/user")
public class UserController {

    @RequestMapping(method = RequestMethod.POST, path = "/create-car")
    public ResponseEntity<?> createCar(@RequestBody CarCreateBindingModel car) {


        return ResponseEntity.ok(car);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/upload/car-image", consumes = "multipart/form-data")
    public ResponseEntity image(@RequestParam("file") MultipartFile carImage){
        System.out.println();

        return ResponseEntity.ok(true);
    }
}
