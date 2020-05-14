package trippy.config;

import org.springframework.stereotype.Component;
import trippy.domain.entities.UserRole;
import trippy.repositories.UserRoleRepository;

import javax.annotation.PostConstruct;

@Component
public class DatabaseSeeder {

    private final UserRoleRepository userRoleRepository;

    public DatabaseSeeder(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    @PostConstruct
    private void seedDatabaseWithRoles() {
        if (this.userRoleRepository.count() > 0) {
            return;
        }

        this.userRoleRepository.save(this.createRole("ROLE_ROOT_ADMIN"));
        this.userRoleRepository.save(this.createRole("ROLE_ADMIN"));
        this.userRoleRepository.save(this.createRole("ROLE_MODERATOR"));
        this.userRoleRepository.save(this.createRole("ROLE_USER"));
    }

    private UserRole createRole(String role) {
        UserRole userRole = new UserRole();
        userRole.setName(role);

        return userRole;
    }
}
