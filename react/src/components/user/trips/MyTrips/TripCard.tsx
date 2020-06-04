import React from "react";

import { Card, Row, Col, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import MyTripModel from "./my-trip-interface";

interface Props {
    tripData: MyTripModel,
}

const TripCard: React.FC<Props> = ({ tripData }) => {
    return <Card className="mb-3">
        <Card.Body>
            <Row>
                <Col className="col-md-7 col-xl-9 col-lg-8">
                    <Row>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="card-feature-title"> From: </span>
                            <span>{tripData.from.name}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="card-feature-title"> To: </span>
                            <span>{tripData.to.name}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="card-feature-title"> Date: </span>
                            <span>{tripData.departureDate}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="far fa-clock"></i>
                            <span className="card-feature-title"> Time: </span>
                            <span className="align-top">{tripData.departureTime}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-car"></i>
                            <span className="card-feature-title"> Car: </span>
                            <span>{tripData.car.make}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-users"></i>
                            <span className="card-feature-title"> Seats: </span>
                            <span>{tripData.seatsTaken} out of {tripData.car.passengerCapacity}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-tags"></i>
                            <span className="card-feature-title"> Price: </span>
                            <span>{tripData.pricePerPerson} lv.</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button as={Link} to={`/trips/details/${tripData.id}`} variant="info">Details</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card >
};

export default TripCard;