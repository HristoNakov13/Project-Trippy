package trippy.util.constants;

public class TripValidationConstants {

    public static final String ERROR_TITLE = "Trip form parameters failed to validate.";

    public static final String FROM_REQUIRED = "From is required";
    public static final String TO_REQUIRED = "To is required";
    public static final String CAR_REQUIRED = "Car is required";
    public static final String INVALID_DATE = "Invalid date";

    public static final int MIN_PRICE_PER_PERSON = 0;
    public static final int MAX_PRICE_PER_PERSON = 100;
    public static final String INVALID_PRICE_MSG = "Price must be between " + MIN_PRICE_PER_PERSON + " and " + MAX_PRICE_PER_PERSON;


    public static final int MIN_ESTIMATED_TRAVEL_TIME = 1;
    public static final int MAX_ESTIMATED_TRAVEL_TIME = 12;
    public static final String INVALID_ESTIMATED_TRAVEL_TIME = "Travel time must be between " + MIN_ESTIMATED_TRAVEL_TIME + " and " + MAX_ESTIMATED_TRAVEL_TIME;


    public static final int MAX_ADDITIONAL_INFO_LENGTH = 255;
    public static final String INVALID_ADDITIONAL_INFO_LENGTH = "Additional info cannot be more than " + MAX_ADDITIONAL_INFO_LENGTH + " characters";
}
