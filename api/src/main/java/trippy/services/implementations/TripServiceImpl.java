package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.Notification;
import trippy.domain.entities.Trip;
import trippy.domain.entities.User;
import trippy.repositories.TripRepository;
import trippy.services.TripService;
import trippy.util.entities.notifications.NotificationBuilder;
import trippy.util.entities.trips.search.SearchTripParams;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final NotificationBuilder notificationBuilder;

    public TripServiceImpl(TripRepository tripRepository, NotificationBuilder notificationBuilder) {
        this.tripRepository = tripRepository;
        this.notificationBuilder = notificationBuilder;
    }

    @Override
    public void createTrip(Trip trip) {
        this.tripRepository.saveAndFlush(trip);
    }

    @Override
    public List<Trip> getUserTrips(String userId) {
        return this.tripRepository.getUserTrips(userId);
    }

    @Override
    public Trip getTripById(String tripId) {
        if (tripId == null) {
            throw new EntityNotFoundException();
        }

        return this.tripRepository.findById(tripId)
                .orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public List<Trip> search(SearchTripParams searchTripParams) {
        return this.tripRepository.searchTrips(searchTripParams.getFrom(),
                searchTripParams.getTo(),
                searchTripParams.getDesiredSeats(),
                searchTripParams.getDepartureDate());
    }

    @Override
    public boolean canApplyForTrip(String userId, String tripId) {
        Trip trip = this.tripRepository.findById(tripId).orElse(null);
        boolean isNotCreator = trip != null
                && !trip.getDriver().getId()
                .equals(userId);

        return isNotCreator;
    }

    @Override
    public void apply(User applicant, String tripId) {
        Trip trip = this.tripRepository.findById(tripId).get();
        trip.getApplicants().add(applicant);

        tripRepository.saveAndFlush(trip);
    }

    @Override
    public boolean hasApplied(User user, String tripId) {
        Trip trip = tripRepository.findById(tripId).orElse(null);

        return trip != null
                && trip.getApplicants()
                .stream()
                .anyMatch(applicant -> applicant.getId().equals(user.getId()));
    }
}
