package trippy.domain.entities;

import javax.persistence.*;

@Entity
@Table(name = "cars")
public class Car extends BaseEntity {

    private String make;
    private String model;
    private int passengerCapacity;
    private boolean canEat;
    private boolean canDrink;
    private boolean canSmoke;
    private boolean petsAllowed;
    private boolean hasLuggageSpace;
    private boolean hasAirConditioning;
    private User owner;
    private Image image;

    public Car() {
    }

    @Column(name = "make")
    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Column(name = "passenger_capacity")
    public int getPassengerCapacity() {
        return passengerCapacity;
    }

    public void setPassengerCapacity(int passengerCapacity) {
        this.passengerCapacity = passengerCapacity;
    }

    @Column(name = "can_eat")
    public boolean isCanEat() {
        return canEat;
    }

    public void setCanEat(boolean canEat) {
        this.canEat = canEat;
    }

    @Column(name = "can_drink")
    public boolean isCanDrink() {
        return canDrink;
    }

    public void setCanDrink(boolean canDrink) {
        this.canDrink = canDrink;
    }

    @Column(name = "can_smoke")
    public boolean isCanSmoke() {
        return canSmoke;
    }

    public void setCanSmoke(boolean canSmoke) {
        this.canSmoke = canSmoke;
    }

    @Column(name = "pets_allowed")
    public boolean isPetsAllowed() {
        return petsAllowed;
    }

    public void setPetsAllowed(boolean petsAllowed) {
        this.petsAllowed = petsAllowed;
    }

    @Column(name = "has_luggage_space")
    public boolean isHasLuggageSpace() {
        return hasLuggageSpace;
    }

    public void setHasLuggageSpace(boolean hasLuggageSpace) {
        this.hasLuggageSpace = hasLuggageSpace;
    }

    @Column(name = "has_air_conditioning")
    public boolean isHasAirConditioning() {
        return hasAirConditioning;
    }

    public void setHasAirConditioning(boolean hasAirConditioning) {
        this.hasAirConditioning = hasAirConditioning;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @OneToOne
    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
