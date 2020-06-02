package trippy.web.controllers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import trippy.domain.entities.Car;
import trippy.domain.entities.City;
import trippy.domain.entities.Trip;
import trippy.domain.entities.User;
import trippy.domain.models.binding.trip.TripCreateBindingModel;
import trippy.domain.models.view.cars.CarCreateTripViewModel;
import trippy.services.CarService;
import trippy.services.CityService;
import trippy.services.TripService;
import trippy.util.constants.TripValidationConstants;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;
import trippy.web.responses.CreateTripFormData;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/user/trips")
public class TripController {

    private final CityService cityService;
    private final ModelMapper modelMapper;
    private final CarService carService;
    private final ValidatorUtil validatorUtil;
    private final TripService tripService;

    public TripController(CityService cityService, ModelMapper modelMapper, CarService carService, ValidatorUtil validatorUtil, TripService tripService) {
        this.cityService = cityService;
        this.modelMapper = modelMapper;
        this.carService = carService;
        this.validatorUtil = validatorUtil;
        this.tripService = tripService;

        init();
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

    @RequestMapping(method = RequestMethod.POST, path = "/create")
    public ResponseEntity<?> createTrip(@RequestBody TripCreateBindingModel tripCreateBindingModel, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        if (!this.carService.isCarOwner(user.getId(), tripCreateBindingModel.getCar())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<ValidationError> errors = this.validatorUtil.getErrors(tripCreateBindingModel);
        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse(TripValidationConstants.ERROR_TITLE, errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        Trip toBeCreated;

        try {
            toBeCreated = this.modelMapper.map(tripCreateBindingModel, Trip.class);
        } catch (NumberFormatException | EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        toBeCreated.setDriver(user);
        this.tripService.createTrip(toBeCreated);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //adds type mappings
    private void init() {
        Converter<String, City> cityFetch = new Converter<String, City>() {
            @Override
            public City convert(MappingContext<String, City> context) {
                Long id = Long.valueOf(context.getSource());

                return cityService.getCityById(id);
            }
        };

        Converter<String, Car> carFetch = new Converter<String, Car>() {
            @Override
            public Car convert(MappingContext<String, Car> context) {
                return carService.getCarById(context.getSource());
            }
        };

        this.modelMapper.createTypeMap(TripCreateBindingModel.class, Trip.class)
                .addMappings(mapping ->
                        mapping.using(cityFetch).map(TripCreateBindingModel::getFrom, Trip::setFrom))
                .addMappings(mapping ->
                        mapping.using(cityFetch).map(TripCreateBindingModel::getTo, Trip::setTo))
                .addMappings(mapping ->
                        mapping.using(carFetch).map(TripCreateBindingModel::getCar, Trip::setCar));
    }
}
