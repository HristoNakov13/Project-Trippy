package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import trippy.domain.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByUsername(String username);
}
