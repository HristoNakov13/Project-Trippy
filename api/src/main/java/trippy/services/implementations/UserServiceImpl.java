package trippy.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import trippy.domain.entities.User;
import trippy.domain.entities.UserRole;
import trippy.domain.models.service.UserServiceModel;
import trippy.repositories.UserRepository;
import trippy.repositories.UserRoleRepository;
import trippy.services.UserService;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, UserRoleRepository userRoleRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public void signUp(UserServiceModel user) {
        //TODO
    }

    /**
     *{@inheritDoc}
     */
    @Override
    public UserServiceModel getUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

        return this.modelMapper.map(user, UserServiceModel.class);
    }

    /**
     *{@inheritDoc}
     */
    @Override
    public boolean isTakenUsername(String username) {
        User user = this.userRepository.findByUsername(username)
                .orElse(null);

        return user != null;
    }

    /**
     *{@inheritDoc}
     */
    @Override
    public boolean isTakenEmail(String email) {
        User user = this.userRepository.findByEmail(email)
                .orElse(null);

        return user != null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    /**
     * If a user is first to register he is assigned every possible role
     * including ROOT_ADMIN. Otherwise only USER role.
     *
     * @return {@link Set} collection of {@link UserRole}.
     */
    private Set<UserRole> getAssignedRoles() {
        Set<UserRole> roles = new HashSet<>();

        if (this.isFirstToRegister()) {
            roles.add(this.userRoleRepository.findByName("ROLE_ROOT_ADMIN"));
            roles.add(this.userRoleRepository.findByName("ROLE_ADMIN"));
            roles.add(this.userRoleRepository.findByName("ROLE_MODERATOR"));
            roles.add(this.userRoleRepository.findByName("ROLE_USER"));
        } else {
            roles.add(this.userRoleRepository.findByName("ROLE_USER"));
        }

        return roles;
    }

    /**
     * Checks if the database contains any {@link User}
     *
     * @return {@code boolean}
     */
    private boolean isFirstToRegister() {
        return this.userRepository.count() == 0;
    }
}

