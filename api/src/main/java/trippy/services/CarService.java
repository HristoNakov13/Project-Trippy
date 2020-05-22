package trippy.services;

import trippy.domain.entities.Image;
import trippy.domain.models.service.CarServiceModel;

public interface CarService {

    CarServiceModel createCar(CarServiceModel car, String ownerId);

    void setCarImage(String carId, Image carImage);
}
