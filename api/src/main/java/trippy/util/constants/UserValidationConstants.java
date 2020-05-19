package trippy.util.constants;

public class UserValidationConstants {

    public static final String ERROR_RESPONSE_TITLE = "Your user request parameters didn't validate.";


    public static final String EMAIL_REGEX = "(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
    public static final String INVALID_EMAIL_MSG = "Invalid email address";
    public static final String EMAIL_REQUIRED = "Email is required";
    public static final String EMAIL_TAKEN = "Email is taken";


    public static final int MIN_USERNAME_LENGTH = 5;
    public static final int MAX_USERNAME_LENGTH = 50;
    //String format cannot be used as annotation attributes
    //That is why the length values are hardcoded into the message
    public static final String INVALID_USERNAME_LENGTH_MSG = "Username must between 5 and 50 characters";
    public static final String USERNAME_IS_REQUIRED = "Username is required";
    public static final String USERNAME_TAKEN = "Username is taken";


    public static final int MIN_PASSWORD_LENGTH = 6;
    public static final int MAX_PASSWORD_LENGTH = 250;
    //same applies as to the username msg
    public static final String INVALID_PASSWORD_LENGTH_MSG = "Password must between 6 and 250 characters";
    public static final String PASSWORD_REQUIRED = "Password is required";
}
