interface TripCreate {
    from: string,
    to: string,
    departureDate: Date | null,
    car: string,
    pricePerPerson: number,
    additionalInfo: string,
    estimatedTravelTime: number,
}

export default TripCreate;