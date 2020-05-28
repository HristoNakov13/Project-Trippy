package trippy.util.constants;

public class CarValidationConstants {

    public static final String INVALID_ID_REQUEST = "Invalid id. No such car exists.";

    public static final int MIN_PASSENGER_CAPACITY = 1;
    public static final int MAX_PASSENGER_CAPACITY = 5;
    public static final String MIN_PASSENGERS_INVALID_MSG = "Passenger capacity must be at least "  + MIN_PASSENGER_CAPACITY;
    public static final String MAX_PASSENGERS_INVALID_MSG = "Passenger capacity cannot be more than "  + MAX_PASSENGER_CAPACITY;


    public static final int MIN_MAKE_CHAR_COUNT = 2;
    public static final int MAX_MAKE_CHAR_COUNT = 30;
    public static final String MAKE_INVALID_LENGTH = "Make must be between " + MIN_MAKE_CHAR_COUNT + " and " + MAX_MAKE_CHAR_COUNT + " characters";
    public static final String MAKE_REQUIRED = "Make is required";


    public static final int MIN_MODEL_CHAR_COUNT = 2;
    public static final int MAX_MODEL_CHAR_COUNT = 30;
    public static final String MODEL_INVALID_LENGTH = "Model must be between " + MIN_MODEL_CHAR_COUNT + " and " + MAX_MODEL_CHAR_COUNT + " characters";
    public static final String MODEL_REQUIRED = "Model is required";


    public static final String INVALID_IMAGE = "Invalid image file";
    public static final String ERROR_RESPONSE_TITLE = "Your car request parameters didn't validate.";
}
