import React, { Fragment, useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";

import CarDetailsModel from "./car-details-interface";
import carService from "../../../../services/car-service";

const CarDetails: React.FC = () => {
    const [car, setCar] = useState({} as CarDetailsModel);
    const location: any = useLocation();
    const history = useHistory();

    useEffect(() => {
        const id = location?.state?.id;
        carService.getCarById(id)
        .then((res: CarDetailsModel) => {
            console.log(res);
        }).catch(() => {
            history.push("/not-found");
        })
    }, [])
    return <div></div>

};

export default CarDetails;