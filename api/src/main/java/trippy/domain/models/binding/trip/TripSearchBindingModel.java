package trippy.domain.models.binding.trip;

import java.time.LocalDate;

public class TripSearchBindingModel {

    private Long from;
    private Long to;
    private Integer desiredSeats;
    private LocalDate departureDate;

    public TripSearchBindingModel() {
    }

    public Long getFrom() {
        return from;
    }

    public void setFrom(Long from) {
        this.from = from;
    }

    public Long getTo() {
        return to;
    }

    public void setTo(Long to) {
        this.to = to;
    }

    public Integer getDesiredSeats() {
        return desiredSeats;
    }

    public void setDesiredSeats(Integer desiredSeats) {
        this.desiredSeats = desiredSeats;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }
}
