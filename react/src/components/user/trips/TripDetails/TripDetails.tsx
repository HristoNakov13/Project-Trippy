import React, { useEffect, useState } from "react";
import "./TripDetails.css";

import { useHistory, useParams, Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";

import TripDetailsModel from "./trip-details-interface";
import tripService from "../../../../services/trip-service";

const TripDetails: React.FC = () => {
    const [tripDetails, setTripDetails] = useState({} as TripDetailsModel);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        tripService.getTripDetails(id)
            .then(setTripDetails)
            .catch(err => {
                history.push("/not-found");
            });
    }, [history, id]);

    return (
        <Row>
            <Col className="lg-7">
                <Card className="mb-3">
                    <Card.Header>
                        <Row className="mt-2">
                            <Col className="col-auto">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="card-feature-title align-top"> From: </span>
                                <span className="align-top">{tripDetails.from && tripDetails.from.name}</span>
                            </Col>
                            <Col className="col-auto d-none d-md-block">
                                <i className="fas fa-chevron-right"></i>
                            </Col>
                            <Col className="col-auto">
                                <i className="fas fa-map-marker-alt"></i>
                                <span className="card-feature-title align-top"> To: </span>
                                <span className="align-top">{tripDetails.to && tripDetails.to.name}</span>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col className="col-12 col-xl-6">
                                <i className="fas fa-calendar-alt"></i>
                                <span className="card-feature-title align-top"> Departure date: </span>
                                <span className="align-top">{tripDetails.departureDate}</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <i className="far fa-clock"></i>
                                <span className="card-feature-title align-top"> Departure time: </span>
                                <span className="align-top">{tripDetails.departureTime}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-12 col-xl-6">
                                <i className="fas fa-tags"></i>
                                <span className="card-feature-title align-top"> Price per person: </span>
                                <span className="align-top">{tripDetails.pricePerPerson} lv.</span>
                            </Col>
                            <Col className="col-12 d-block d-lg-none">
                                <i className="fas fa-car"></i>
                                <span className="card-feature-title align-top">Vehicle: </span>
                                <span className="align-top"> {tripDetails.car && tripDetails.car.make} - {tripDetails.car && tripDetails.car.model}</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <i className="fas fa-users"></i>
                                <span className="card-feature-title align-top"> Available seats: </span>
                                <span className="align-top">{(tripDetails.car ? tripDetails.car.passengerCapacity : 0) - tripDetails.seatsTaken}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <i className="fas fa-info-circle"></i>
                                <span className="card-feature-title align-top"> Additional information:</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <span>{tripDetails.additionalInfo ? tripDetails.additionalInfo : "No additiona information."}</span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="mb-3">
                    <Card.Header>
                        <span>Vehicle details</span>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col className="col-12 col-xl-6">
                                <span className="card-feature-title">Make: </span>
                                <span>{tripDetails.car && tripDetails.car.make}</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className="card-feature-title">Model: </span>
                                <span>{tripDetails.car && tripDetails.car.model}</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className="card-feature-title">Color: </span>
                                <span>{tripDetails.car && tripDetails.car.color}</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className="card-feature-title">Passenger capacity: </span>
                                <span>{tripDetails.car && tripDetails.car.passengerCapacity}</span>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="col-12 col-xl-6">
                                <span className={(tripDetails.car && tripDetails.car.hasAirConditioning) ? "allowed" : "unallowed"}><i className="fas fa-snowflake"></i></span>
                                <span> Air Conditioning</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className={(tripDetails.car && tripDetails.car.hasLuggageSpace) ? "allowed" : "unallowed"}><i className="fas fa-suitcase"></i></span>
                                <span> Luggage space</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className={(tripDetails.car && tripDetails.car.canDrink) ? "allowed" : "unallowed"}><i className="fas fa-wine-bottle"></i></span>
                                <span> Drinks</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className={(tripDetails.car && tripDetails.car.canEat) ? "allowed" : "unallowed"}><i className="fas fa-utensils"></i></span>
                                <span> Food</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className={(tripDetails.car && tripDetails.car.canSmoke) ? "allowed" : "unallowed"}><i className="fas fa-smoking"></i></span>
                                <span> Smoking</span>
                            </Col>
                            <Col className="col-12 col-xl-6">
                                <span className={(tripDetails.car && tripDetails.car.petsAllowed) ? "allowed" : "unallowed"}><i className="fas fa-paw"></i></span>
                                <span> Pets</span>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="lg-5">
                <Card.Body>
                    <Row>
                        <Col className="col-12 col-sm">
                            <Link to="/">
                                <span>{tripDetails.driver && tripDetails.driver.username}</span>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <i className="fas fa-id-card"></i>
                            <span className="card-feature-title align-top"> Contacts: </span>
                            <span className="align-top">Only visible to approved passengers.</span>
                        </Col>
                    </Row>
                    <Row className="row mb-3">
                        <Col>
                            <Button as={Link} to="/" className="btn btn-block btn-primary">
                                <i className="fab fa-instagram"></i> &nbsp; Instagram profile
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Col>
        </Row>
    );
};

export default TripDetails;