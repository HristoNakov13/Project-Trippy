package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Trip;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, String> {

    @Query(value = "SELECT * FROM trips t WHERE t.driver_id = :userId"
            , nativeQuery = true)
    List<Trip> getUserTrips(@Param("userId") String userId);

    @Query(value = "SELECT t FROM Trip t " +
            "WHERE t.from.id = :from " +
            "AND t.to.id = :to " +
            "AND (:desiredSeats IS NULL OR t.car.passengerCapacity - t.passengers.size >= :desiredSeats)" +
            "AND (:departureDate IS NULL OR FUNCTION('DAY', t.departureDate) = FUNCTION('DAY', :departureDate)) ")
    List<Trip> searchTrips(@Param("from") Long from,
                           @Param("to") Long to,
                           @Param("desiredSeats") Integer desiredSeats,
                           @Param("departureDate") LocalDate departureDate);
}
