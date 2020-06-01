package trippy.config;

import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import trippy.domain.entities.City;
import trippy.domain.entities.UserRole;
import trippy.repositories.CityRepository;
import trippy.repositories.UserRoleRepository;
import trippy.util.files.FileUtil;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.StringReader;
import java.util.Arrays;

@Component
public class DatabaseSeeder {

    private final UserRoleRepository userRoleRepository;
    private final CityRepository cityRepository;
    private final FileUtil fileUtil;
    private final Gson gson;

    public DatabaseSeeder(UserRoleRepository userRoleRepository, CityRepository cityRepository, FileUtil fileUtil, Gson gson) {
        this.userRoleRepository = userRoleRepository;
        this.cityRepository = cityRepository;
        this.fileUtil = fileUtil;
        this.gson = gson;
    }

    @PostConstruct
    private void seedDb() {
        this.seedDatabaseWithRoles();
        this.seedDbWithCities();
    }

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

    private void seedDbWithCities() {
        if (this.cityRepository.count() > 0) {
            return;
        }

        File file = new File(
                getClass().getClassLoader().getResource("towns.json").getFile()
        );

        String content = this.fileUtil.getFileContent(file);
        City[] cities = this.gson.fromJson(new StringReader(content), City[].class);

        this.cityRepository.saveAll(Arrays.asList(cities));
    }
}
