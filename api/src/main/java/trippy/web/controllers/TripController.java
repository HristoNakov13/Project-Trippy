package trippy.web.controllers;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import trippy.domain.entities.Car;
import trippy.domain.entities.City;
import trippy.domain.entities.Trip;
import trippy.domain.entities.User;
import trippy.domain.models.binding.trip.TripCreateBindingModel;
import trippy.domain.models.binding.trip.TripSearchBindingModel;
import trippy.domain.models.view.cars.CarCreateTripViewModel;
import trippy.domain.models.view.trips.mytrips.TripMyTripsViewModel;
import trippy.domain.models.view.trips.search.CitySearchViewModel;
import trippy.domain.models.view.trips.search.TripSearchViewModel;
import trippy.domain.models.view.trips.tripdetails.TripDetailsViewModel;
import trippy.services.CarService;
import trippy.services.CityService;
import trippy.services.TripService;
import trippy.util.constants.TripValidationConstants;
import trippy.util.trips.search.SearchTripParams;
import trippy.util.trips.search.SearchTripParamsBuilder;
import trippy.util.validator.ErrorResponse;
import trippy.util.validator.ValidationError;
import trippy.util.validator.ValidatorUtil;
import trippy.web.responses.CreateTripFormData;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static trippy.util.constants.TripValidationConstants.INVALID_SEARCH_TITLE;

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

    @RequestMapping(method = RequestMethod.GET, path = "/my-trips")
    public ResponseEntity<List<TripMyTripsViewModel>> getUserTrips(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<TripMyTripsViewModel> trips = this.tripService.getUserTrips(user.getId())
                .stream()
                .map(trip -> this.modelMapper.map(trip, TripMyTripsViewModel.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(trips);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/details/{id}")
    public ResponseEntity<?> tripDetails(@PathVariable("id") String tripId) {
        Trip trip;
        try {
            trip = this.tripService.getTripById(tripId);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        TripDetailsViewModel tripDetailsViewModel = this.modelMapper.map(trip, TripDetailsViewModel.class);

        return ResponseEntity.ok(tripDetailsViewModel);
    }

    @RequestMapping(method = RequestMethod.GET, path = "/cities")
    public ResponseEntity<List<CitySearchViewModel>> getAvailableCities() {
        List<CitySearchViewModel> cities = this.cityService.getAllCities()
                .stream()
                .map(city -> this.modelMapper.map(city, CitySearchViewModel.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(cities);
    }

    @RequestMapping(method = RequestMethod.POST, path = "/search")
    public ResponseEntity<?> search(@RequestBody TripSearchBindingModel tripSearchBindingModel) {
        List<ValidationError> errors = this.validatorUtil.getErrors(tripSearchBindingModel);

        if (!errors.isEmpty()) {
            ErrorResponse errorResponse = new ErrorResponse(INVALID_SEARCH_TITLE, errors);

            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
        SearchTripParamsBuilder builder = new SearchTripParamsBuilder();
        SearchTripParams searchParams = builder.setFrom(tripSearchBindingModel.getFrom())
                .setTo(tripSearchBindingModel.getTo())
                .setDepartureDate(tripSearchBindingModel.getDepartureDate())
                .setDesiredSeats(tripSearchBindingModel.getDesiredSeats())
                .build();

        //not sure if there should be return case with 404 if no trips are found
        List<TripSearchViewModel> trips = this.tripService.search(searchParams)
                .stream()
                .map(trip -> this.modelMapper.map(trip, TripSearchViewModel.class))
                .collect(Collectors.toList());

        return new ResponseEntity<>(trips, HttpStatus.OK);
    }

    //adds type mappings
    private void init() {
        //trip create
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

        //my trips view model

        Converter<LocalDateTime, String> extractDate = new Converter<LocalDateTime, String>() {
            @Override
            public String convert(MappingContext<LocalDateTime, String> context) {
                DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;

                return context.getSource()
                        .format(formatter);
            }
        };

        Converter<LocalDateTime, String> extractTime = new Converter<LocalDateTime, String>() {
            @Override
            public String convert(MappingContext<LocalDateTime, String> context) {
                DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_TIME;

                return context.getSource()
                        .format(formatter);
            }
        };

        Converter<Set<User>, Integer> seatsTakenConverter = new Converter<Set<User>, Integer>() {
            @Override
            public Integer convert(MappingContext<Set<User>, Integer> context) {
                return context.getSource().size();
            }
        };

        this.modelMapper.createTypeMap(Trip.class, TripMyTripsViewModel.class)
                .addMappings(mapping ->
                        mapping.using(extractDate).map(Trip::getDepartureDate, TripMyTripsViewModel::setDepartureDate))
                .addMappings(mapping ->
                        mapping.using(extractTime).map(Trip::getDepartureDate, TripMyTripsViewModel::setDepartureTime))
                .addMappings(mapping ->
                        mapping.using(seatsTakenConverter).map(Trip::getPassengers, TripMyTripsViewModel::setSeatsTaken));

        //trip details

        this.modelMapper.createTypeMap(Trip.class, TripDetailsViewModel.class)
                .addMappings(mapping ->
                        mapping.using(extractDate).map(Trip::getDepartureDate, TripDetailsViewModel::setDepartureDate))
                .addMappings(mapping ->
                        mapping.using(extractTime).map(Trip::getDepartureDate, TripDetailsViewModel::setDepartureTime))
                .addMappings(mapping ->
                        mapping.using(seatsTakenConverter).map(Trip::getPassengers, TripDetailsViewModel::setSeatsTaken));

        //trip search
        this.modelMapper.createTypeMap(Trip.class, TripSearchViewModel.class)
                .addMappings(mapping ->
                        mapping.using(extractDate).map(Trip::getDepartureDate, TripSearchViewModel::setDepartureDate))
                .addMappings(mapping ->
                        mapping.using(extractTime).map(Trip::getDepartureDate, TripSearchViewModel::setDepartureTime))
                .addMappings(mapping ->
                        mapping.using(seatsTakenConverter).map(Trip::getPassengers, TripSearchViewModel::setSeatsTaken));
    }
}
