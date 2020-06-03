package trippy.domain.models.view.trips.mytrips;

import java.math.BigDecimal;

public class TripMyTripsViewModel {

    private String id;
    private UserMyTripsViewModel driver;
    private CarMyTripsViewModel car;
    private CityMyTripsViewModel from;
    private CityMyTripsViewModel to;
    private String departureDate;
    private String departureTime;
    private BigDecimal pricePerPerson;
    private Integer seatsTaken;

    public TripMyTripsViewModel() {
    }

    public UserMyTripsViewModel getDriver() {
        return driver;
    }

    public void setDriver(UserMyTripsViewModel driver) {
        this.driver = driver;
    }

    public CarMyTripsViewModel getCar() {
        return car;
    }

    public void setCar(CarMyTripsViewModel car) {
        this.car = car;
    }

    public CityMyTripsViewModel getFrom() {
        return from;
    }

    public void setFrom(CityMyTripsViewModel from) {
        this.from = from;
    }

    public CityMyTripsViewModel getTo() {
        return to;
    }

    public void setTo(CityMyTripsViewModel to) {
        this.to = to;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public BigDecimal getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(BigDecimal pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }
    public Integer getSeatsTaken() {
        return seatsTaken;
    }

    public void setSeatsTaken(Integer seatsTaken) {
        this.seatsTaken = seatsTaken;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
