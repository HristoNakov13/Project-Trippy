package trippy.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import trippy.domain.entities.Car;
import trippy.domain.models.service.CarServiceModel;
import trippy.domain.models.service.UserServiceModel;
import trippy.repositories.CarRepository;
import trippy.services.CarService;
import trippy.services.UserService;

import javax.persistence.EntityNotFoundException;
import java.util.List;

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

    //if id is null spring throws IllegalArgumentException not sure if its good idea to catch it
    //in the controller instead of handling it here in the service
    @Override
    public Car getCarById(String id) {
        Car car;
        //a bit hard to read but I really dont like throwing error twice
        //if id or car is null then the error is thrown
        //if id is not null then query is made to the database to find the car
        //if the car is not found its set to null and it passes the check car == null
        if (id == null || (car = this.carRepository.findById(id).orElse(null)) == null) {
            throw new EntityNotFoundException();
        }

        return car;
    }

    @Override
    public void deleteCar(String userId, String carId) {
        this.carRepository.deleteCarForUser(userId, carId);
    }

    //currently I think this is best approach for editing entity but still have my doubts
    //there were few examples of pretty much the same method on stackoverflow and the alternatives were worse
    @Override
    public Car editCar(CarServiceModel carServiceModel, String carId) {
        Car carEntity = this.carRepository.findById(carId)
                .orElseThrow(EntityNotFoundException::new);

        Car editCar = this.modelMapper.map(carServiceModel, Car.class);
        editCar.setId(carEntity.getId());
        editCar.setOwner(carEntity.getOwner());

        //if editCar's image is null that means the user did not pass a new picture
        //in that case the old image is used again
        if (editCar.getImage() == null) {
            editCar.setImage(carEntity.getImage());
        }

        return this.carRepository.saveAndFlush(editCar);
    }

    @Override
    public boolean isCarOwner(String userId, String carId) {
        Car car = this.carRepository.findById(carId).orElse(null);

        return car != null
                && car.getOwner()
                .getId()
                .equals(userId);
    }

    @Override
    public List<Car> getAllUserCars(String userId) {
        return this.carRepository.getAllCarsForUser(userId);
    }
}