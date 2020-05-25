package trippy.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import trippy.domain.entities.Car;
import trippy.domain.models.service.CarServiceModel;
import trippy.domain.models.service.UserServiceModel;
import trippy.repositories.CarRepository;
import trippy.services.CarService;
import trippy.services.UserService;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;

    public CarServiceImpl(CarRepository carRepository, ModelMapper modelMapper, UserService userService) {
        this.carRepository = carRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    @Override
    public CarServiceModel createCar(CarServiceModel car, String ownerUsername) {
        UserServiceModel owner = this.userService.getUserByUsername(ownerUsername);
        car.setOwner(owner);

        Car carEntity = this.modelMapper.map(car, Car.class);
        this.carRepository.saveAndFlush(carEntity);

        return this.modelMapper.map(carEntity, CarServiceModel.class);
    }
}