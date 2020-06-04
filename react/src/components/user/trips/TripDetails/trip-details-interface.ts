interface CarTripDetails {
    id: string,
    make: string,
    model: string,
    color: string,
    imageSrc: string,
    passengerCapacity: number,
    canEat: boolean,
    canDrink: boolean,
    canSmoke: boolean,
    petsAllowed: boolean,
    hasLuggageSpace: boolean,
    hasAirConditioning: boolean,
}

interface DriverTripDetails {
    id: string,
    username: string,
}

interface CityTripDetails {
    name: string,
}


interface TripDetailsModel {
    id: string,
    driver: DriverTripDetails,
    car: CarTripDetails,
    from: CityTripDetails,
    to: CityTripDetails,
    departureDate: string,
    departureTime: string,
    seatsTaken: number,
    pricePerPerson: number,
    additionalInfo: string,
}

export default TripDetailsModel;