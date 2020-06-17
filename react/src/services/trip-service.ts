import http from "../util/requester";

import CreateTripFormData from "../components/user/trips/CreateTrip/create-trip-form-data";
import TripCreate from "../components/user/trips/trip-create-interface";
import MyTripModel from "../components/user/trips/MyTrips/my-trip-interface";
import TripDetailsModel from "../components/user/trips/TripDetails/trip-details-interface";
import SearchCity from "../components/user/trips/SearchTrips/search-trip-cities-interface";
import SearchTrip from "../components/user/trips/SearchTrips/search-trip-interface";
import TripApplicationHandle from "../components/navigation/UserNotifications/NotificationAction/actions/TripApplyAction/trip-apply-handle-request-interface";

const API_ROOT = "/api/user/trips";

const END_POINTS = {
    getCreateTripFormData: API_ROOT + "/create",
    createTrip: API_ROOT + "/create",
    getMyTrips: API_ROOT + "/my-trips",
    getTripDetails: API_ROOT + "/details",
    getAvailableSearchCities: API_ROOT + "/cities",
    search: API_ROOT + "/search",
    apply: API_ROOT + "/apply",
    hasApplied: API_ROOT + "/applicant-check",
    approveApplicant: API_ROOT + "/approve-applicant",
    denyApplicant: API_ROOT + "/deny-applicant",
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

    getTripDetails: (tripId: string): Promise<TripDetailsModel> => {
        return http.get(END_POINTS.getTripDetails + `/${tripId}`);
    },

    getAvailableSearchCities: (): Promise<Array<SearchCity>> => {
        return http.get(END_POINTS.getAvailableSearchCities);
    },

    search: (searchData: SearchTrip): Promise<Array<MyTripModel>> => {
        return http.post(END_POINTS.search, searchData);
    },

    apply: (tripId: string): Promise<any> => {
        return http.post(END_POINTS.apply, { id: tripId });
    },

    hasApplied: (tripId: string): Promise<boolean> => {
        return http.post(END_POINTS.hasApplied, { id: tripId });
    },

    approveApplicant: (handleData: TripApplicationHandle): Promise<any> => {
        return http.post(END_POINTS.approveApplicant, handleData);
    },

    denyApplicant: (handleData: TripApplicationHandle): Promise<any> => {
        return http.post(END_POINTS.denyApplicant, handleData);
    },
};

export default tripService;