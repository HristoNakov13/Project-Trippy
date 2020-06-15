package trippy.domain.models.view.trips.search;

public class CarSearchViewModel {

    private String make;
    private Integer passengerCapacity;

    public CarSearchViewModel() {
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public Integer getPassengerCapacity() {
        return passengerCapacity;
    }

    public void setPassengerCapacity(Integer passengerCapacity) {
        this.passengerCapacity = passengerCapacity;
    }
}
