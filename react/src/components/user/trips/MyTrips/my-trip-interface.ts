export interface MyTripUserModel {
    username: string,
}

export interface MyTripCarModel {
    make: string,
    passengerCapacity: number,
}

export interface MyTripCityModel {
    name: string,
}

interface MyTripModel {
    id: string,
    driver: MyTripUserModel,
    car: MyTripCarModel,
    from: MyTripCityModel,
    to: MyTripCityModel,
    departureDate: string,
    departureTime: string,
    seatsTaken: number,
    pricePerPerson: number,
}

export default MyTripModel;