package trippy.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import trippy.domain.entities.User;
import trippy.domain.models.service.UserServiceModel;

public interface UserService extends UserDetailsService {

    void signUp(UserServiceModel user);

    /**
     * Tries to find a user by the given username from the database.
     * If found {@link User} is mapped to and returned as {@link UserServiceModel}.
     *
     * @param username {@code String} the unique name of a {@link User}
     * @return {@link UserServiceModel} a transformed version of {@link User}
     * @throws UsernameNotFoundException if no user with the given username is found in the database.
     */
    UserServiceModel getUserByUsername(String username);

    /**
     * Checks if the database contains a {@link User} with the given username.
     *
     * @param username {@code String} the unique name of a {@link User}
     * @return {@code boolean}.
     */
    boolean isTakenUsername(String username);

    /**
     * Checks if the database contains a {@link User} with the given email address.
     *
     * @param email {@code String} the unique email address of a {@link User}
     * @return {@code boolean}.
     */
    boolean isTakenEmail(String email);
}