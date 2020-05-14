package trippy.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import trippy.domain.entities.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {

    UserRole findByName(String name);
}
