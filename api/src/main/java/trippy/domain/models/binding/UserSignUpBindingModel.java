package trippy.domain.models.binding;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import static trippy.util.constants.UserValidationConstants.*;

public class UserSignUpBindingModel {

    private String username;
    private String email;
    private String password;

    public UserSignUpBindingModel() {
    }

    @NotNull(message = USERNAME_IS_REQUIRED)
    @Length(min = MIN_USERNAME_LENGTH, max = MAX_USERNAME_LENGTH, message = INVALID_USERNAME_LENGTH_MSG)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @NotNull(message = EMAIL_REQUIRED)
    @Pattern(regexp = EMAIL_REGEX, message = INVALID_EMAIL_MSG)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @NotNull(message = PASSWORD_REQUIRED)
    @Length(min = MIN_PASSWORD_LENGTH, max = MAX_PASSWORD_LENGTH, message = INVALID_PASSWORD_LENGTH_MSG)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
