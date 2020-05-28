import Car from "../car-interface";

export interface OnSubmit {
    (carData: Car, { setErrors }: any): void
}

export interface ImageChangeHandler {
    (event: any): void
}