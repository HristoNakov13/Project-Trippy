package trippy.web.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import trippy.domain.entities.City;
import trippy.domain.entities.User;
import trippy.domain.models.view.cars.CarCreateTripViewModel;
import trippy.services.CarService;
import trippy.services.CityService;
import trippy.web.responses.CreateTripFormData;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/user/trips")
public class TripController {

    private final CityService cityService;
    private final ModelMapper modelMapper;
    private final CarService carService;

    public TripController(CityService cityService, ModelMapper modelMapper, CarService carService) {
        this.cityService = cityService;
        this.modelMapper = modelMapper;
        this.carService = carService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/create")
    public ResponseEntity<CreateTripFormData> getFormData(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<CarCreateTripViewModel> cars = this.carService
                .getAllUserCars(user.getId())
                .stream()
                .map(car -> this.modelMapper.map(car, CarCreateTripViewModel.class))
                .collect(Collectors.toList());

        List<City> cities = this.cityService.getAllCities();

        return ResponseEntity.ok(new CreateTripFormData(cars, cities));
    }
}
