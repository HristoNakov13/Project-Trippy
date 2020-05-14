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
    public void register(UserServiceModel user) {


    }

    @Override
    public UserServiceModel getUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));

        return this.modelMapper.map(user, UserServiceModel.class);
    }

    @Override
    public boolean isTakenUsername(String username) {
        User user = this.userRepository.findByUsername(username)
                .orElse(null);

        return user != null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found."));
    }

    private Set<UserRole> getAssignedRoles() {
        Set<UserRole> roles = new HashSet<>();

        if (this.isFirstToRegister()) {
            roles.add(this.userRoleRepository.findByName("ROOT_ADMIN"));
            roles.add(this.userRoleRepository.findByName("ADMIN"));
            roles.add(this.userRoleRepository.findByName("MODERATOR"));
            roles.add(this.userRoleRepository.findByName("USER"));
        } else {
            roles.add(this.userRoleRepository.findByName("USER"));
        }

        return roles;
    }

    private boolean isFirstToRegister() {
        return this.userRepository.count() == 0;
    }
}

