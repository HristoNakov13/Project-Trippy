package trippy.services.implementations;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import trippy.domain.entities.Car;
import trippy.domain.entities.User;
import trippy.domain.entities.UserRole;
import trippy.domain.models.service.UserServiceModel;
import trippy.repositories.UserRepository;
import trippy.repositories.UserRoleRepository;
import trippy.services.UserService;

import javax.security.auth.login.CredentialNotFoundException;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import static trippy.util.constants.UserValidationConstants.EMAIL_TAKEN;
import static trippy.util.constants.UserValidationConstants.USERNAME_TAKEN;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserRoleRepository userRoleRepository, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void signUp(UserServiceModel user) {
        User userEntity = this.modelMapper.map(user, User.class);

        boolean isTakenEmail = this.isTakenEmail(userEntity.getEmail());
        boolean isTakenUsername = this.isTakenUsername(userEntity.getUsername());

        //not sure if an exception for each case is acceptable at this point. EmailTakenException etc
        if (isTakenEmail && isTakenUsername) {
            throw new IllegalArgumentException(
                    String.format("property: email, username | message: %s, %s",
                            EMAIL_TAKEN,
                            USERNAME_TAKEN)
            );
        }

        if (isTakenEmail) {
            throw new IllegalArgumentException(
                    String.format("property: email | message: %s",
                            EMAIL_TAKEN)
            );
        }

        if (isTakenUsername) {
            throw new IllegalArgumentException(
                    String.format("property: username | message: %s",
                            USERNAME_TAKEN)
            );
        }

        userEntity.setRoles(this.getAssignedRoles());
        userEntity.setEnabled(true);
        userEntity.setPassword(this.encodePassword(userEntity.getPassword()));

        this.userRepository.saveAndFlush(userEntity);
    }

    /**
     * Encodes the password of a user.
     *
     * @param password {@code String} the user's password.
     * @return {@code String} encoded password.
     */
    private String encodePassword(String password) {
        return this.bCryptPasswordEncoder.encode(password);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserServiceModel getUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

        return this.modelMapper.map(user, UserServiceModel.class);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserServiceModel getUserById(String id) {
        User user = this.userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found."));

        return this.modelMapper.map(user, UserServiceModel.class);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserServiceModel getUserByUsernameOrEmail(String usernameEmail) throws CredentialNotFoundException {
        User user = this.userRepository.findByUsernameOrEmail(usernameEmail, usernameEmail)
                .orElseThrow(() -> new CredentialNotFoundException("User not found."));

        return this.modelMapper.map(user, UserServiceModel.class);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isTakenUsername(String username) {
        User user = this.userRepository.findByUsername(username)
                .orElse(null);

        return user != null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isTakenEmail(String email) {
        User user = this.userRepository.findByEmail(email)
                .orElse(null);

        return user != null;
    }

    @Override
    public Set<Car> getUserCarsByUsername(String username) throws CredentialNotFoundException {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new CredentialNotFoundException("User not found."));

        return user.getCars();
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

