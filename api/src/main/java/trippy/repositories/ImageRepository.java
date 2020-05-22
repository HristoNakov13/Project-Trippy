package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import trippy.domain.entities.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
}
