import React, { Fragment } from "react";
import "./MyCars.css";

import { CardColumns, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import CarCard from "./CarCard";

const MyCars: React.FC = () => {
    return <Fragment>
        <h1 className="page-title">My cars</h1>
        <div className="add-car">
        <Button variant="success" as={Link} to="/user/cars/create-car"><i className="fas fa-plus"></i> Add car</Button>
        </div>
        <CardColumns>
            <CarCard />
            <CarCard />
            <CarCard />
        </CardColumns>
    </Fragment>
};

export default MyCars;