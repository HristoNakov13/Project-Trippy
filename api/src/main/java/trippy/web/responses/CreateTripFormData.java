package trippy.web.responses;

import trippy.domain.entities.City;
import trippy.domain.models.view.cars.CarCreateTripViewModel;

import java.util.List;

public class CreateTripFormData {

    private List<CarCreateTripViewModel> cars;
    private List<City> cities;

    public CreateTripFormData(List<CarCreateTripViewModel> cars, List<City> cities) {
        this.cars = cars;
        this.cities = cities;
    }

    public List<CarCreateTripViewModel> getCars() {
        return cars;
    }

    public void setCars(List<CarCreateTripViewModel> cars) {
        this.cars = cars;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }
}
