package trippy.util.constants;

public class UserAuthConstants {

    public static final String JWT_COOKIE_NAME = "_AUTH";

    public static final int COOKIE_EXPIRATION = 5 * 365 * 24 * 60 * 60;
    public static final String INVALID_LOGOUT_REQUEST = "Invalid logout request. Session cookie not present.";


    public static final String ERROR_RESPONSE_TITLE = "Your user request parameters didn't validate.";
    public static final String LOGIN_FAILED_MSG = "Wrong username/email or password";
}
