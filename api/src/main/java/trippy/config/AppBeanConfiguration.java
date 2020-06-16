package trippy.config;

import com.google.gson.Gson;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import trippy.util.cookies.CookieUtil;
import trippy.util.cookies.CookieUtilImpl;
import trippy.util.entities.notifications.NotificationBuilder;
import trippy.util.files.FileUtil;
import trippy.util.files.FileUtilImpl;
import trippy.util.images.ImageUtil;
import trippy.util.images.ImageUtilImpl;
import trippy.util.validator.ValidatorUtil;
import trippy.util.validator.ValidatorUtilImpl;

@Configuration
public class AppBeanConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public ValidatorUtil validatorUtil() {
        return new ValidatorUtilImpl();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CookieUtil cookieUtil() {
        return new CookieUtilImpl();
    }

    @Bean
    public ImageUtil imageUtil() {
        return new ImageUtilImpl();
    }

    @Bean
    public FileUtil fileUtil() {
        return new FileUtilImpl();
    }

    @Bean
    public Gson gson() {
        return new Gson()
                .newBuilder()
                .create();
    }

    @Bean
    public NotificationBuilder notificationBuilder() {
        return new NotificationBuilder();
    }
}
