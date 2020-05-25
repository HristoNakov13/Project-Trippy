package trippy.domain.models.binding.car;

import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;
import trippy.util.validator.custom.ValidImage;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import static trippy.util.constants.CarValidationConstants.*;

public class CarCreateBindingModel {

    private String make;
    private String model;
    private int passengerCapacity;
    private boolean canEat;
    private boolean canDrink;
    private boolean canSmoke;
    private boolean petsAllowed;
    private boolean hasLuggageSpace;
    private boolean hasAirConditioning;
    private MultipartFile image;

    @NotNull(message = MAKE_REQUIRED)
    @Length(min = MIN_MAKE_CHAR_COUNT, max = MAX_MAKE_CHAR_COUNT, message = MAKE_INVALID_LENGTH)
    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    @NotNull(message = MODEL_REQUIRED)
    @Length(min = MIN_MODEL_CHAR_COUNT, max = MAX_MODEL_CHAR_COUNT, message = MODEL_INVALID_LENGTH)
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Min(value = MIN_PASSENGER_CAPACITY, message = MIN_PASSENGERS_INVALID_MSG)
    @Max(value = MAX_PASSENGER_CAPACITY, message = MAX_PASSENGERS_INVALID_MSG)
    public int getPassengerCapacity() {
        return passengerCapacity;
    }

    public void setPassengerCapacity(int passengerCapacity) {
        this.passengerCapacity = passengerCapacity;
    }

    public boolean canEat() {
        return canEat;
    }

    public void setCanEat(boolean canEat) {
        this.canEat = canEat;
    }

    public boolean canDrink() {
        return canDrink;
    }

    public void setCanDrink(boolean canDrink) {
        this.canDrink = canDrink;
    }

    public boolean canSmoke() {
        return canSmoke;
    }

    public void setCanSmoke(boolean canSmoke) {
        this.canSmoke = canSmoke;
    }

    public boolean isPetsAllowed() {
        return petsAllowed;
    }

    public void setPetsAllowed(boolean petsAllowed) {
        this.petsAllowed = petsAllowed;
    }

    public boolean hasLuggageSpace() {
        return hasLuggageSpace;
    }

    public void setHasLuggageSpace(boolean hasLuggageSpace) {
        this.hasLuggageSpace = hasLuggageSpace;
    }

    public boolean hasAirConditioning() {
        return hasAirConditioning;
    }

    public void setHasAirConditioning(boolean hasAirConditioning) {
        this.hasAirConditioning = hasAirConditioning;
    }

    @ValidImage(message = INVALID_IMAGE)
    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
