package trippy.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import trippy.domain.models.service.UserServiceModel;

public interface UserService extends UserDetailsService {

    void register(UserServiceModel user);

    UserServiceModel getUserByUsername(String username);

    boolean isTakenUsername(String username);
}