interface CarDetailsModel {
    id: string,
    make: string,
    model: string,
    passengerCapacity: number,
    imageSrc: string,
    color: string,
    canEat: boolean,
    canDrink: boolean,
    canSmoke: boolean,
    petsAllowed: boolean,
    hasLuggageSpace: boolean,
    hasAirConditioning: boolean,
}

export default CarDetailsModel;