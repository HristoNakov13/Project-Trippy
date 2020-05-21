package trippy.domain.models.service;

public class CarServiceModel {

    private String id;
    private String make;
    private String model;
    private int passengerCapacity;
    private boolean canEat;
    private boolean canDrink;
    private boolean canSmoke;
    private boolean petsAllowed;
    private boolean hasLuggageSpace;
    private boolean hasAirConditioning;
    private String imageCloudId;
    private UserServiceModel owner;

    public CarServiceModel() {
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getPassengerCapacity() {
        return passengerCapacity;
    }

    public void setPassengerCapacity(int passengerCapacity) {
        this.passengerCapacity = passengerCapacity;
    }

    public boolean isCanEat() {
        return canEat;
    }

    public void setCanEat(boolean canEat) {
        this.canEat = canEat;
    }

    public boolean isCanDrink() {
        return canDrink;
    }

    public void setCanDrink(boolean canDrink) {
        this.canDrink = canDrink;
    }

    public boolean isCanSmoke() {
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

    public boolean isHasLuggageSpace() {
        return hasLuggageSpace;
    }

    public void setHasLuggageSpace(boolean hasLuggageSpace) {
        this.hasLuggageSpace = hasLuggageSpace;
    }

    public boolean isHasAirConditioning() {
        return hasAirConditioning;
    }

    public void setHasAirConditioning(boolean hasAirConditioning) {
        this.hasAirConditioning = hasAirConditioning;
    }

    public String getImageCloudId() {
        return imageCloudId;
    }

    public void setImageCloudId(String imageCloudId) {
        this.imageCloudId = imageCloudId;
    }

    public UserServiceModel getOwner() {
        return owner;
    }

    public void setOwner(UserServiceModel owner) {
        this.owner = owner;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
