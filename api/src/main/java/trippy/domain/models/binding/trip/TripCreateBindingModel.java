package trippy.domain.models.binding.trip;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import static trippy.util.constants.TripValidationConstants.*;

public class TripCreateBindingModel {

    private String from;
    private String to;
    private String car;
    private BigDecimal pricePerPerson;
    private Integer estimatedTravelTime;
    private LocalDateTime departureDate;
    private String additionalInfo;

    public TripCreateBindingModel() {
    }

    @NotNull(message = FROM_REQUIRED)
    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    @NotNull(message = TO_REQUIRED)
    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    @NotNull(message = CAR_REQUIRED)
    public String getCar() {
        return car;
    }

    public void setCar(String car) {
        this.car = car;
    }

    @Min(value = MIN_PRICE_PER_PERSON, message = INVALID_PRICE_MSG)
    @Max(value = MAX_PRICE_PER_PERSON, message = INVALID_PRICE_MSG)
    public BigDecimal getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(BigDecimal pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }

    @Min(value = MIN_ESTIMATED_TRAVEL_TIME, message = INVALID_ESTIMATED_TRAVEL_TIME)
    @Max(value = MAX_ESTIMATED_TRAVEL_TIME, message = INVALID_ESTIMATED_TRAVEL_TIME)
    public Integer getEstimatedTravelTime() {
        return estimatedTravelTime;
    }

    public void setEstimatedTravelTime(Integer estimatedTravelTime) {
        this.estimatedTravelTime = estimatedTravelTime;
    }

    @NotNull(message = INVALID_DATE)
    public LocalDateTime getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDateTime departureDate) {
        this.departureDate = departureDate;
    }

    @Length(max = MAX_ADDITIONAL_INFO_LENGTH, message = INVALID_ADDITIONAL_INFO_LENGTH)
    public String getAdditionalInfo() {
        return additionalInfo;
    }

    public void setAdditionalInfo(String additionalInfo) {
        this.additionalInfo = additionalInfo;
    }
}
