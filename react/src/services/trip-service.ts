import http from "../util/requester";

import CreateTripFormData from "../components/user/trips/CreateTrip/create-trip-form-data";
import TripCreate from "../components/user/trips/trip-create-interface";
import MyTripModel from "../components/user/trips/MyTrips/my-trip-interface";
import TripDetails from "../components/user/trips/TripDetails/trip-details-interface";

const API_ROOT = "/api/user/trips";

const END_POINTS = {
    getCreateTripFormData: API_ROOT + "/create",
    createTrip: API_ROOT + "/create",
    getMyTrips: API_ROOT + "/my-trips",
    getTripDetails: API_ROOT + "/details" 
};

const tripService = {
    getCreateTripFormData: (): Promise<CreateTripFormData> => {
        return http.get(END_POINTS.getCreateTripFormData);
    },
    
    createTrip: (tripData: TripCreate): Promise<any> => {
        return http.post(END_POINTS.createTrip, tripData);
    },

    getMyTrips: (): Promise<Array<MyTripModel>> => {
        return http.get(END_POINTS.getMyTrips);
    },

    getTripDetails: (tripId: string): Promise<TripDetails> => {
        return http.get(END_POINTS.getTripDetails + `/${tripId}`);
    },
};

export default tripService;