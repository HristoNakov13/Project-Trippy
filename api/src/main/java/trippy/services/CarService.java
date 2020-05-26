package trippy.services;

import trippy.domain.entities.Car;
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
}
