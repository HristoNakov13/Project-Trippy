import React, { Fragment, useEffect, useState } from "react";
import "./MyCars.css";

import { CardColumns, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import carService from "../../../../services/car-service";
import CarCard from "./CarCard/CarCard";
import CarListModel from "./car-list-interface";

const MyCars: React.FC = () => {
    const [cars, setCars] = useState([] as Array<CarListModel>);
    useEffect(() => {
        carService.getUserCars()
            .then(setCars)
            .catch(console.error);
    }, []);
    return <Fragment>
        <h1 className="page-title">My cars</h1>
        <div className="add-car">
            <Button variant="success" as={Link} to="/user/cars/create-car"><i className="fas fa-plus"></i> Add car</Button>
        </div>
        <CardColumns>
            {cars.map((car: CarListModel) => {
                return <CarCard key={car.id} car={car} />
            })}
        </CardColumns>
    </Fragment>
};

export default MyCars;