package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Car;

@Repository
public interface CarRepository extends JpaRepository<Car, String> {
}
