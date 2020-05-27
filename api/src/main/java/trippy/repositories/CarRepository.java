package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Car;

import javax.transaction.Transactional;

@Repository
public interface CarRepository extends JpaRepository<Car, String> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM cars c WHERE c.user_id = :userId AND c.id = :carId",
            nativeQuery = true)
    void deleteCarForUser(@Param("userId") String userId, @Param("carId") String carId);
}
