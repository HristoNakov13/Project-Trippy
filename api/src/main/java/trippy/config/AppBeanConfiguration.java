package trippy.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import trippy.util.CookiesUtil.CookieUtil;
import trippy.util.CookiesUtil.CookieUtilImpl;
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
}
