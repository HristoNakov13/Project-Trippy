package trippy.domain.models.binding.user;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

import static trippy.util.constants.UserValidationConstants.*;

public class UserChangePasswordBindingModel {

    private String oldPassword;
    private String newPassword;

    public UserChangePasswordBindingModel() {
    }

    @NotNull(message= PASSWORD_REQUIRED)
    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    @NotNull(message = NEW_PASSWORD_REQUIRED)
    @Length(min = MIN_PASSWORD_LENGTH, max = MAX_PASSWORD_LENGTH, message = INVALID_NEW_PASSWORD_LENGTH_MSG)
    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
