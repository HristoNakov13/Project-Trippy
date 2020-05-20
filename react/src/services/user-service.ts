import http from "../util/requester";

import Car from "../components/user/cars/car-interfaces";

const API_ROOT = "/api/user";

const END_POINTS = {
    createCar: API_ROOT + "/create-car",
    uploadCarImage: API_ROOT + "/upload/car-image"
};

const userService = {
    createCar: (carData: Car) => {
        return http.post(END_POINTS.createCar, carData);
    },
    
    uploadCarImage: (data: FormData) => {
        return http.uploadFile(END_POINTS.uploadCarImage, data);
    }
};

export default userService;