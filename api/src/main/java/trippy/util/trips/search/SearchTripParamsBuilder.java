package trippy.util.trips.search;

import java.time.LocalDate;

public class SearchTripParamsBuilder {

    private Long from;
    private Long to;
    private Integer desiredSeats;
    private LocalDate departureDate;
    private Integer seatsTaken;

    public SearchTripParamsBuilder setFrom(Long from) {
        this.from = from;

        return this;
    }

    public SearchTripParamsBuilder setTo(Long to) {
        this.to = to;

        return this;
    }

    public SearchTripParamsBuilder setDesiredSeats(Integer desiredSeats) {
        this.desiredSeats = desiredSeats;

        return this;
    }

    public SearchTripParamsBuilder setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;

        return this;
    }

    public SearchTripParams build() {
        SearchTripParams params = new SearchTripParams();

        params.setFrom(this.from);
        params.setTo(this.to);
        params.setDesiredSeats(this.desiredSeats);
        params.setDepartureDate(this.departureDate);

        return params;
    }

    public Integer getSeatsTaken() {
        return seatsTaken;
    }

    public void setSeatsTaken(Integer seatsTaken) {
        this.seatsTaken = seatsTaken;
    }
}
