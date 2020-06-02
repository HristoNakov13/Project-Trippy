package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {
}
