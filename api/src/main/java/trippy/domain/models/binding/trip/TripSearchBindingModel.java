package trippy.domain.models.binding.trip;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

import static trippy.util.constants.CarValidationConstants.*;
import static trippy.util.constants.TripValidationConstants.*;

public class TripSearchBindingModel {

    private Long from;
    private Long to;
    private Integer desiredSeats;
    private LocalDate departureDate;

    public TripSearchBindingModel() {
    }

    @NotNull(message = FROM_REQUIRED)
    public Long getFrom() {
        return from;
    }

    public void setFrom(Long from) {
        this.from = from;
    }

    @NotNull(message = TO_REQUIRED)
    public Long getTo() {
        return to;
    }

    public void setTo(Long to) {
        this.to = to;
    }

    @Min(value = MIN_PASSENGER_CAPACITY, message = MIN_PASSENGERS_INVALID_MSG)
    @Max(value = MAX_PASSENGER_CAPACITY, message = MAX_PASSENGERS_INVALID_MSG)
    public Integer getDesiredSeats() {
        return desiredSeats;
    }

    public void setDesiredSeats(Integer desiredSeats) {
        this.desiredSeats = desiredSeats;
    }

    @FutureOrPresent(message = DATE_FUTURE_PRESENT)
    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }
}
