export interface CarsFormData {
    id: string,
    make: string,
    model: string,
}

export interface CitiesFormData {
    id: string,
    name: string,
}

interface CreateTripFormData {
    cars: Array<CarsFormData>,
    cities: Array<CitiesFormData>,
}

export default CreateTripFormData;