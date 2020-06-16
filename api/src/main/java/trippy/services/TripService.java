package trippy.services;

import trippy.domain.entities.Trip;
import trippy.domain.entities.User;
import trippy.util.entities.trips.search.SearchTripParams;

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

    /**
     * Fetches {@link Trip} entities from the database according to the given set of parameters.
     *
     * @param searchTripParams {@link SearchTripParams} contains all desired qualities a {@link Trip} must have.
     * @return {@link List<Trip>} collection of all {@link Trip} that match the search parameters.
     */
    List<Trip> search(SearchTripParams searchTripParams);

    /**
     * Checks whether a {@link User} can apply to join a {@link Trip}
     *
     * @param userId id of the {@link User}
     * @param tripId id of the {@link Trip}
     * @return {@code boolean} result of the check.
     */
    boolean canApplyForTrip(String userId, String tripId);

    /**
     * {@link User} applies to join a {@link Trip}
     *
     * @param applicant {@link User} applicant for the trip
     * @param tripId id of {@link Trip}
     */
    void apply(User applicant, String tripId);

    /**
     * Checks whether a {@link User} already applied to join a {@link Trip}
     *
     * @param user {@link User} the entity we are looking for.
     * @param tripId id of the {@link Trip}
     * @return {@code boolean} result of the check.
     */
    boolean hasApplied(User user, String tripId);
}
