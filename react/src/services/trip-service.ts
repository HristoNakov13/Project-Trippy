import http from "../util/requester";
import CreateTripFormData from "../components/user/trips/CreateTrip/create-trip-form-data";
import TripCreate from "../components/user/trips/trip-create-interface";

const API_ROOT = "/api/user/trips";

const END_POINTS = {
    getCreateTripFormData: API_ROOT + "/create",
    createTrip: API_ROOT + "/create", 
};

const tripService = {
    getCreateTripFormData: (): Promise<CreateTripFormData> => {
        return http.get(END_POINTS.getCreateTripFormData);
    },
    
    createTrip: (tripData: TripCreate): Promise<any> => {
        return http.post(END_POINTS.createTrip, tripData);
    }
};

export default tripService;