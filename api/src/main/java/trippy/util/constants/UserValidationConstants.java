package trippy.util.constants;

public class UserValidationConstants {

    public static final String ERROR_RESPONSE_TITLE = "Your user request parameters didn't validate.";


    public static final String EMAIL_REGEX = "(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
    public static final String INVALID_EMAIL_MSG = "Invalid email address";
    public static final String EMAIL_REQUIRED = "Email is required";
    public static final String EMAIL_TAKEN = "Email is taken";


    public static final int MIN_USERNAME_LENGTH = 5;
    public static final int MAX_USERNAME_LENGTH = 50;
    public static final String INVALID_USERNAME_LENGTH_MSG = "Username must be between " + MIN_USERNAME_LENGTH + " and " + MAX_USERNAME_LENGTH + " characters";
    public static final String USERNAME_IS_REQUIRED = "Username is required";
    public static final String USERNAME_TAKEN = "Username is taken";


    public static final int MIN_PASSWORD_LENGTH = 6;
    public static final int MAX_PASSWORD_LENGTH = 250;
    public static final String INVALID_PASSWORD_LENGTH_MSG = "Password must be between " + MIN_PASSWORD_LENGTH + " and " + MAX_PASSWORD_LENGTH + " characters";
    public static final String PASSWORD_REQUIRED = "Password is required";
    public static final String OLD_NEW_PASSWORDS_MISMATCH = "Password dont match with current";
    public static final String INVALID_NEW_PASSWORD_LENGTH_MSG = "New " + INVALID_PASSWORD_LENGTH_MSG;
    public static final String NEW_PASSWORD_REQUIRED = "New " + PASSWORD_REQUIRED;
    public static final String PASSWORD_VALIDATION_TITLE = "Passwords failed to validate.";


    public static final String PHONE_NUMBER_REGEX = "^((\\+359)|(0))([0-9]{9})$";
    public static final String INVALID_PHONE_NUMBER = "Invalid phone number";


    public static final String SOCIAL_REGEX = "(?:(?:http|https):\\/\\/)?(?:www.)?(?:instagram.com|instagr.am)\\/([A-Za-z0-9-_]+)((\\/)|())";
    public static final String INVALID_SOCIAL = "Invalid social media url";


    public static final int MIN_DISPLAY_NAME_LENGTH = 3;
    public static final int MAX_DISPLAY_NAME_LENGTH = 20;
    public static final String INVALID_DISPLAY_NAME_LENGTH = "Display name length must be between " + MIN_DISPLAY_NAME_LENGTH + " and " + MAX_DISPLAY_NAME_LENGTH + " characters";
}
