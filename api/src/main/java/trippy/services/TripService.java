package trippy.services;

import trippy.domain.entities.Trip;
import trippy.util.trips.search.SearchTripParams;

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

    /**
     * Fetches {@link Trip} by its id.
     *
     * @param tripId id of the {@link Trip}
     * @return {@link Trip} with the given id.
     */
    Trip getTripById(String tripId);

    List<Trip> search(SearchTripParams searchTripParams);
}
