package trippy.domain.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "trips")
public class Trip extends BaseEntity {

    private City from;
    private City to;
    private LocalDateTime departureDate;
    private Integer estimatedTravelTime;
    private User driver;
    private Car car;
    private Set<User> passengers;
    private Set<User> applicants;
    private BigDecimal pricePerPerson;
    private String additionalInfo;

    @ManyToOne
    public City getFrom() {
        return from;
    }

    public void setFrom(City from) {
        this.from = from;
    }

    @ManyToOne
    public City getTo() {
        return to;
    }

    public void setTo(City to) {
        this.to = to;
    }

    @Column(name = "departure_date")
    public LocalDateTime getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDateTime departureDate) {
        this.departureDate = departureDate;
    }

    @Column(name = "estimated_travel_time")
    public Integer getEstimatedTravelTime() {
        return estimatedTravelTime;
    }

    public void setEstimatedTravelTime(Integer estimatedTravelTime) {
        this.estimatedTravelTime = estimatedTravelTime;
    }

    @ManyToOne
    public User getDriver() {
        return driver;
    }

    public void setDriver(User driver) {
        this.driver = driver;
    }

    @ManyToOne
    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    @ManyToMany
    @JoinTable(
            name = "trips_passengers",
            joinColumns = {@JoinColumn(name = "trip_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}
    )
    public Set<User> getPassengers() {
        return passengers;
    }

    public void setPassengers(Set<User> passengers) {
        this.passengers = passengers;
    }

    @Column(name = "price_per_person")
    public BigDecimal getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(BigDecimal pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }

    @Column(name = "additional_info")
    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }

    @ManyToMany
    @JoinTable(
            name = "trips_applicants",
            joinColumns = {@JoinColumn(name = "trip_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")}
    )
    public Set<User> getApplicants() {
        return applicants;
    }

    public void setApplicants(Set<User> applicants) {
        this.applicants = applicants;
    }
}
