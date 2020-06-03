interface CarTripDetails {
    id: string,
    make: string,
    model: string,
}

interface DriverTripDetails {
    id: string,
    username:string,
}

interface CityTripDetails {
    name: string,
}


interface TripDetails {
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

export default TripDetails;