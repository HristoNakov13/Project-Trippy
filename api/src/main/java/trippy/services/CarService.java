package trippy.services;

import trippy.domain.entities.Car;
import trippy.domain.entities.User;
import trippy.domain.models.service.CarServiceModel;

import javax.persistence.EntityNotFoundException;

public interface CarService {

    CarServiceModel createCar(CarServiceModel car, String ownerId);

    /**
     * Get {@link Car} by its id.
     *
     * @param id the unique identifier of each car.
     * @return {@link Car} the car with the given id.
     * @throws EntityNotFoundException if the given {@param id} is {@code null} or no car entity with such id exists.
     */
    Car getCarById(String id) throws EntityNotFoundException;

    /**
     * Deletes {@link Car} from the database.
     *
     * @param userId {@code String} id of the {@link Car} owner {@link User}.
     * @param carId {@code String} id of the {@link Car} that's to be deleted.
     */
    void deleteCar(String userId, String carId);
}
