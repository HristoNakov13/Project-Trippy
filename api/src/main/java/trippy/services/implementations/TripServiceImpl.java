package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.Trip;
import trippy.repositories.TripRepository;
import trippy.services.TripService;

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
}
