import React, { useState, useEffect } from "react";
import "./CarDetails.css";

import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

import noImage from "../../../../static/images/no-image-icon.png";

import CarDetailsModel from "./car-details-interface";
import carService from "../../../../services/car-service";

const CarDetails: React.FC = () => {
    const [car, setCar] = useState({} as CarDetailsModel);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        carService.getCarDetails(id)
            .then(setCar)
            .catch(() => {
                history.push("/not-found");
            })
    }, [history, id]);

    const handleDeleteCar = () => {
        carService.deleteCar(car.id)
            .then(() => {
                history.push("/user/cars");
            })
            .catch(console.error);
    };

    const { imageSrc, make, model, passengerCapacity, color, canEat,
        canDrink, petsAllowed, canSmoke,
        hasAirConditioning, hasLuggageSpace } = car;


    return <Card>
        <div className="wrapper">
            <div className="pic-container">
                <Card.Img variant="top" src={imageSrc ? imageSrc : noImage} />
            </div>
        </div>
        <Card.Body>
            <Card.Title>Car details</Card.Title>
            <Card.Text>
                <Row>
                    <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                        <div>
                            <span className="property-title">Make: </span>{make}
                        </div>
                        <div>
                            <span className="property-title">Model: </span>{model}
                        </div>
                        <div>
                            <span className="property-title">Seats: </span>{passengerCapacity}
                        </div>
                        <div>
                            <span className="property-title">Color: </span>{color}
                        </div>
                    </Col>
                    <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                        <Row>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={canEat ? "allowed" : "unallowed"}><i className="fas fa-utensils"></i></span><span> Food</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={canDrink ? "allowed" : "unallowed"}><i className="fas fa-wine-bottle"></i></span><span> Drinks</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={petsAllowed ? "allowed" : "unallowed"}><i className="fas fa-paw"></i></span><span> Pets</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={canSmoke ? "allowed" : "unallowed"}><i className="fas fa-smoking"></i></span><span> Smoking</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={hasLuggageSpace ? "allowed" : "unallowed"}><i className="fas fa-suitcase"></i></span><span> Luggage space</span>
                            </Col>
                            <Col className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <span className={hasAirConditioning ? "allowed" : "unallowed"}><i className="fas fa-snowflake"></i></span><span> Air Conditioning</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="btn-wrapper">
                        <Button as={Link} to={`/user/cars/edit-car/${id}`} variant="success"><i className="fas fa-edit"></i> Edit</Button>
                    </Col>
                    <Col className="btn-wrapper">
                        <Button variant="danger" onClick={handleDeleteCar}><i className="fas fa-trash-alt"></i> Delete</Button>
                    </Col>
                </Row>
            </Card.Text>
        </Card.Body>
    </Card>
};

export default CarDetails;