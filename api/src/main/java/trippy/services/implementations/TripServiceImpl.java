package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.Trip;
import trippy.repositories.TripRepository;
import trippy.services.TripService;
import trippy.util.trips.search.SearchTripParams;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;

    public TripServiceImpl(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
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
}
