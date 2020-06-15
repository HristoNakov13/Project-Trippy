package trippy.domain.models.view.trips.search;

import java.math.BigDecimal;

public class TripSearchViewModel {

    private String id;
    private CitySearchViewModel from;
    private CitySearchViewModel to;
    private String departureTime;
    private String departureDate;
    private Integer seatsTaken;
    private CarSearchViewModel car;
    private BigDecimal pricePerPerson;

    public TripSearchViewModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CitySearchViewModel getFrom() {
        return from;
    }

    public void setFrom(CitySearchViewModel from) {
        this.from = from;
    }

    public CitySearchViewModel getTo() {
        return to;
    }

    public void setTo(CitySearchViewModel to) {
        this.to = to;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public Integer getSeatsTaken() {
        return seatsTaken;
    }

    public void setSeatsTaken(Integer seatsTaken) {
        this.seatsTaken = seatsTaken;
    }

    public CarSearchViewModel getCar() {
        return car;
    }

    public void setCar(CarSearchViewModel car) {
        this.car = car;
    }

    public BigDecimal getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(BigDecimal pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }
}
