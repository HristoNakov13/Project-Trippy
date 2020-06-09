package trippy.domain.models.binding.user;

import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import trippy.util.validator.custom.ValidImage;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import static trippy.util.constants.UserValidationConstants.*;

public class UserEditProfileBindingModel {

    private String displayName;
    private String email;
    private String social;
    private String phoneNumber;
    private MultipartFile image;

    @Length(min = MIN_DISPLAY_NAME_LENGTH, max = MAX_DISPLAY_NAME_LENGTH, message = INVALID_DISPLAY_NAME_LENGTH)
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @NotNull(message = EMAIL_REQUIRED)
    @Pattern(regexp = EMAIL_REGEX, message = INVALID_EMAIL_MSG)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Pattern(regexp = SOCIAL_REGEX, message = INVALID_SOCIAL)
    public String getSocial() {
        return social;
    }

    public void setSocial(String social) {
        this.social = social;
    }

    @Pattern(regexp = PHONE_NUMBER_REGEX, message = INVALID_PHONE_NUMBER)
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @ValidImage
    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
