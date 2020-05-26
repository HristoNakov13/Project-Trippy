import http from "../util/requester";

import CarListModel from "../components/user/cars/MyCars/car-list-interface";
import CarDetailsModel from "../components/user/cars/CarDetails/car-details-interface";

const API_ROOT = "/api/user";

const END_POINTS = {
    createCar: API_ROOT + "/create-car",
    getUserCars: API_ROOT + "/cars",
    getCarById: API_ROOT + "/cars/details"
};

const userService = {
    createCar: (formData: FormData): Promise<any> => {
        return http.formUploadFile(END_POINTS.createCar, formData);
    },

    getUserCars: (): Promise<Array<CarListModel>> => {
        return http.get(END_POINTS.getUserCars);
    },

    getCarById: (id: string): Promise<CarDetailsModel> => {
        return http.post(END_POINTS.getCarById, { id });
    },
};

export default userService;