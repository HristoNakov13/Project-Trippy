package trippy.services;

import trippy.domain.entities.Car;
import trippy.domain.entities.User;
import trippy.domain.models.binding.car.CarEditBindingModel;
import trippy.domain.models.service.CarServiceModel;

import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface CarService {

    CarServiceModel createCar(CarServiceModel car, String ownerId);

    /**
     * Get {@link Car} by its id.
     *
     * @param id the unique identifier of each car.
     * @return {@link Car} the entity with the given id.
     * @throws EntityNotFoundException if the given id is {@code null} or no {@link Car} with such id exists.
     */
    Car getCarById(String id) throws EntityNotFoundException;

    /**
     * Deletes {@link Car} from the database.
     *
     * @param userId {@code String} id of the {@link Car} owner {@link User}.
     * @param carId {@code String} id of the {@link Car} that's to be deleted.
     */
    void deleteCar(String userId, String carId);


    /**
     * Edits {@link Car} entity in the database.
     * Fields subject to change are contained in {@link CarEditBindingModel}.
     *
     * @param editCar {@link CarServiceModel} contains all the new entity data.
     * @param carId {@code String} the identifier of the car entity that's to be edited.
     * @return {@link Car} with the new values post edit.
     */
    Car editCar(CarServiceModel editCar, String carId);

    /**
     * Checks if a {@link Car} belongs to a particular {@code User}.
     *
     * @param userId {@code String} the identifier of the {@link User} entity.
     * @param carId {@code String} the identifier of the {@link Car} entity.
     * @return {@code boolean} whether the user is owner or not.
     */
    boolean isCarOwner(String userId, String carId);


    /**
     * Fetches all {@link Car}s belonging to the given user.
     *
     * @param userId {@code String} the identifier of the {@link User} entity.
     * @return {@link List<Car>} all the {@link Car} belonging to the given user.
     */
    List<Car> getAllUserCars(String userId);
}
