package trippy.domain.models.view.trips.tripdetails;

import java.math.BigDecimal;

public class TripDetailsViewModel {

    private String id;
    private DriverTripDetailsViewModel driver;
    private CarTripDetailsViewModel car;
    private CityTripDetailsViewModel from;
    private CityTripDetailsViewModel to;
    private Integer estimatedTravelTime;
    private String departureDate;
    private String departureTime;
    private Integer seatsTaken;
    private BigDecimal pricePerPerson;
    private String additionalInfo;

    public TripDetailsViewModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DriverTripDetailsViewModel getDriver() {
        return driver;
    }

    public void setDriver(DriverTripDetailsViewModel driver) {
        this.driver = driver;
    }

    public CarTripDetailsViewModel getCar() {
        return car;
    }

    public void setCar(CarTripDetailsViewModel car) {
        this.car = car;
    }

    public CityTripDetailsViewModel getFrom() {
        return from;
    }

    public void setFrom(CityTripDetailsViewModel from) {
        this.from = from;
    }

    public CityTripDetailsViewModel getTo() {
        return to;
    }

    public void setTo(CityTripDetailsViewModel to) {
        this.to = to;
    }

    public Integer getEstimatedTravelTime() {
        return estimatedTravelTime;
    }

    public void setEstimatedTravelTime(Integer estimatedTravelTime) {
        this.estimatedTravelTime = estimatedTravelTime;
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

    public Integer getSeatsTaken() {
        return seatsTaken;
    }

    public void setSeatsTaken(Integer seatsTaken) {
        this.seatsTaken = seatsTaken;
    }

    public BigDecimal getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(BigDecimal pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }

    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
}
