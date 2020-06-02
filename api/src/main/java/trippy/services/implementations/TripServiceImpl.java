package trippy.services.implementations;

import org.springframework.stereotype.Service;
import trippy.domain.entities.Trip;
import trippy.repositories.TripRepository;
import trippy.services.TripService;

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
}
