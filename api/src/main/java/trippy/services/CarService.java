package trippy.services;

import trippy.domain.models.service.CarServiceModel;

public interface CarService {

    CarServiceModel createCar(CarServiceModel car, String ownerId);
}
