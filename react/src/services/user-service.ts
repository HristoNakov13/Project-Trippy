import http from "../util/requester";

import Car from "../components/user/cars/car-interfaces";

const API_ROOT = "/api/user";

const END_POINTS = {
    createCar: API_ROOT + "/create-car",
};

const userService = {
    createCar: (formData: FormData) => {
        return http.formUploadFile(END_POINTS.createCar, formData);
    },
};

export default userService;