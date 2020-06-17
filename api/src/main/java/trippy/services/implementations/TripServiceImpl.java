package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.Notification;
import trippy.domain.entities.Trip;
import trippy.domain.entities.User;
import trippy.domain.entities.enums.NotificationAction;
import trippy.repositories.TripRepository;
import trippy.services.TripService;
import trippy.services.UserService;
import trippy.util.entities.notifications.NotificationBuilder;
import trippy.util.entities.trips.search.SearchTripParams;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

import static trippy.util.constants.NotificationConstants.TRIP_APPLY_TITLE;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final NotificationBuilder notificationBuilder;
    private final UserService userService;

    public TripServiceImpl(TripRepository tripRepository, NotificationBuilder notificationBuilder, UserService userService) {
        this.tripRepository = tripRepository;
        this.notificationBuilder = notificationBuilder;
        this.userService = userService;
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
        String throwMessage = "Trip does not exist.";

        if (tripId == null) {
            throw new EntityNotFoundException(throwMessage);
        }

        return this.tripRepository.findById(tripId)
                .orElseThrow(() -> new EntityNotFoundException(throwMessage));
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
        Trip trip = this.getTripById(tripId);

        if (isOutDatedTrip(trip.getDepartureDate())) {
            throw new IllegalArgumentException("Trip departure date is in the past.");
        }

        if (hasApplied(applicant, trip)) {
            throw new IllegalArgumentException("User has already applied to this trip.");
        }

        trip.getApplicants().add(applicant);
        tripRepository.saveAndFlush(trip);

        String applicantName = applicant.getDisplayName() != null
                ? applicant.getDisplayName()
                : applicant.getUsername();

        Notification applicantNotification = this.notificationBuilder
                .setNotificationAction(NotificationAction.TRIP_APPLY)
                .setTitle(String.format(TRIP_APPLY_TITLE,
                        applicantName,
                        trip.getFrom().getName(),
                        trip.getTo().getName(),
                        trip.getDepartureDate()))
                .setValue(applicant.getId())
                .setDestination(trip.getId())
                .build();

        this.userService.addNotification(trip.getDriver(), applicantNotification);
    }

    /**
     * Checks if a trip departure date is in the past and has expired.
     *
     * @param departureDate {@link LocalDateTime} date of the scheduled departure for the trip.
     * @return {@code boolean} result of comparison between the date in the moment and the trip departure date.
     */
    private boolean isOutDatedTrip(LocalDateTime departureDate) {
        boolean isOutdated = LocalDateTime.now().compareTo(departureDate) > 0;

        return isOutdated;
    }

    @Override
    public boolean hasApplied(User user, String tripId) {
        Trip trip = tripRepository.findById(tripId).orElse(null);

        return this.hasApplied(user, trip);
    }

    private boolean hasApplied(User user, Trip trip) {
        return trip != null
                && trip.getApplicants()
                .stream()
                .anyMatch(applicant -> applicant.getId().equals(user.getId()));
    }

    @Override
    public void approveApplicant(String applicantId, String tripId) {
        Trip trip = this.getTripById(tripId);

        if (!hasFreeSeats(trip.getCar().getPassengerCapacity(),
                trip.getPassengers().size())) {
            throw new IllegalArgumentException("Car does not have any free seats left.");
        }

        User applicant = trip.getApplicants()
                .stream()
                .filter(user -> user.getId().equals(applicantId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("User is not an applicant for this trip."));

        trip.getPassengers().add(applicant);
        trip.getApplicants().remove(applicant);

        this.tripRepository.saveAndFlush(trip);
    }

    /**
     * Checks whether a car has any unoccupied seats left.
     *
     * @param passengerCapacity {@code int} number of total seats in the car.
     * @param passengers        {@code int} number of approved passengers.
     * @return {@code boolean}
     */
    private boolean hasFreeSeats(int passengerCapacity, int passengers) {
        return passengerCapacity - passengers > 0;
    }


    @Override
    public void denyApplicant(String applicantId, String tripId) {
        Trip trip = this.getTripById(tripId);

        boolean hasRemovedApplicant = trip.getApplicants().removeIf(user -> user.getId().equals(applicantId));

        if (!hasRemovedApplicant) {
            throw new IllegalArgumentException("User is not an applicant for this trip.");
        }

        this.tripRepository.saveAndFlush(trip);
    }

    @Override
    public boolean isTripCreator(String userId, String tripId) {
        Trip trip = this.tripRepository.findById(tripId)
                .orElse(null);

        return trip != null
                && trip.getDriver().getId().equals(userId);
    }
}
