package trippy.domain.models.binding.car;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

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

    @NotNull
    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    @NotNull
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Min(value = 1)
    @Max(value = 5)
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
}
