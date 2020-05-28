import http from "../util/requester";

import CarListModel from "../components/user/cars/MyCars/car-list-interface";
import CarDetailsModel from "../components/user/cars/CarDetails/car-details-interface";
import Car from "../components/user/cars/car-interface";

const API_ROOT = "/api/user/cars";

const END_POINTS = {
    createCar: API_ROOT + "/create-car",
    getUserCars: API_ROOT,
    getCarById: API_ROOT + "/details",
    deleteCar: API_ROOT + "/delete",
    getEditCarData: API_ROOT + "/edit/car-data",
    editCar: API_ROOT + "/edit"
};

const userService = {
    createCar: (formData: FormData): Promise<any> => {
        return http.formUploadFile(END_POINTS.createCar, formData);
    },

    getUserCars: (): Promise<Array<CarListModel>> => {
        return http.get(END_POINTS.getUserCars);
    },

    getCarDetails: (id: string): Promise<CarDetailsModel> => {
        return http.post(END_POINTS.getCarById, { id });
    },

    deleteCar: (id: string): Promise<any> => {
        return http.del(END_POINTS.deleteCar, { id });
    },

    getEditCarData: (id: string): Promise<Car> => {
        return http.post(END_POINTS.getEditCarData, { id });
    },

    editCar: (formData: FormData): Promise<any> => {
        return http.formUploadFile(END_POINTS.editCar, formData);
    },
};

export default userService;