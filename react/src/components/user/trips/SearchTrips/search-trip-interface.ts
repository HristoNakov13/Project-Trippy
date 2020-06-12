interface SearchTrip {
    from: string,
    to: string,
    departureDate?: Date | null,
    desiredSeats?: number,
}

export default SearchTrip;