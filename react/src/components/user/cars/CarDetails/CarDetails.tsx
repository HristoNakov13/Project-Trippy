import React, { useState, useEffect, useMemo } from "react";
import "./CarDetails.css";

import { useLocation, useHistory } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

import noImage from "../../../../static/images/no-image-icon.png";

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
                setCar(res);
            }).catch(() => {
                history.push("/not-found");
            })
    }, []);

    const handleDeleteCar = () => {
        carService.deleteCar(car.id)
            .then(() => {
                history.push("/user/cars");
            })
            .catch(console.error);
    };


    return <Card>
        <div className="wrapper">
            <div className="pic-container">
                <Card.Img variant="top" src={car.imageSrc ? car.imageSrc : noImage} />
            </div>
        </div>
        <Card.Body>
            <Card.Title>Car details</Card.Title>
            <Card.Text>
                <Row>
                    <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                        <div>
                            <span className="property-title">Make: </span>{car.make && car.make}
                        </div>
                        <div>
                            <span className="property-title">Model: </span>{car.model && car.model}
                        </div>
                        <div>
                            <span className="property-title">Seats: </span>{car.passengerCapacity && car.passengerCapacity}
                        </div>
                        <div>
                            <span className="property-title">Color: </span>{car.color && car.color}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                        <Row>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={car.canEat ? "allowed" : "unallowed"}><i className="fas fa-utensils"></i></span><span> Food</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={car.canDrink ? "allowed" : "unallowed"}><i className="fas fa-wine-bottle"></i></span><span> Drinks</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={car.petsAllowed ? "allowed" : "unallowed"}><i className="fas fa-paw"></i></span><span> Pets</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={car.canSmoke ? "allowed" : "unallowed"}><i className="fas fa-smoking"></i></span><span> Smoking</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={car.hasLuggageSpace ? "allowed" : "unallowed"}><i className="fas fa-suitcase"></i></span><span> Luggage space</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={car.hasAirConditioning ? "allowed" : "unallowed"}><i className="fas fa-snowflake"></i></span><span> Air Conditioning</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="btn-wrapper">
                        <Button variant="success">Edit</Button>
                    </Col>
                    <Col className="btn-wrapper">
                        <Button variant="danger" onClick={handleDeleteCar}>Delete</Button>
                    </Col>
                </Row>
            </Card.Text>
        </Card.Body>
    </Card>
};

export default CarDetails;