package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Trip;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {

    @Query(value = "SELECT * FROM trips t WHERE t.driver_id = :userId"
            , nativeQuery = true)
    List<Trip> getUserTrips(@Param("userId")String userId);
}
