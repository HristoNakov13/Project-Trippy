package trippy.services;

import trippy.domain.entities.Trip;

import java.util.List;

public interface TripService {

    void createTrip(Trip trip);

    /**
     * Get all user trips he has created.
     *
     * @param userId unique identifier of the user.
     * @return {@link List<Trip>} every trip created by the user.
     */
    List<Trip> getUserTrips(String userId);
}
