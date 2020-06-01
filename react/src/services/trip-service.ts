import http from "../util/requester";
import CreateTripFormData from "../components/user/trips/CreateTrip/create-trip-form-data";

const API_ROOT = "/api/user/trips";

const END_POINTS = {
    getCreateTripFormData: API_ROOT + "/create"
};

const tripService = {
    getCreateTripFormData: (): Promise<CreateTripFormData> => {
        return http.get(END_POINTS.getCreateTripFormData);
    }, 
};

export default tripService;