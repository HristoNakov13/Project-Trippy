import React, { useEffect, useState } from "react";

import TripCard from "./TripCard";
import MyTripModel from "./my-trip-interface";
import tripService from "../../../../services/trip-service";

const MyTrips: React.FC = () => {
    const [trips, setTrips] = useState([] as Array<MyTripModel>);

    useEffect(() => {
        tripService.getMyTrips()
            .then(setTrips)
            .catch(console.error);
    }, []);

    return <div>
        {trips.map((trip: MyTripModel) => {
            return <TripCard tripData={trip} />
        })}
    </div>
};

export default MyTrips;