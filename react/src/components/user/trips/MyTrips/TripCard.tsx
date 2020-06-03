import React from "react";

import { Card, Row, Col, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import MyTripModel from "./my-trip-interface";

interface Props {
    tripData: MyTripModel,
}

const TripCard: React.FC<Props> = ({ tripData }) => {
    return <Card>
        <Card.Body>
            <Row>
                <Col className="col-md-5 col-xl-3 col-lg-4 mb-3 mb-md-0">
                    <div className="d-flex flex-row justify-content-center">
                        {/* <img alt="driver's picture" /> */}
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        <span className="text-md-center">{tripData.driver.username}</span>
                    </div>
                </Col>
                <Col className="col-md-7 col-xl-9 col-lg-8">
                    <Row>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="text-muted"> From: </span>
                            <span>{tripData.from.name}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="text-muted"> To: </span>
                            <span>{tripData.to.name}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="text-muted"> Date: </span>
                            <span>{tripData.departureDate}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="far fa-clock"></i>
                            <span className="text-muted"> Time: </span>
                            <span className="align-top">{tripData.departureTime}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-car"></i>
                            <span className="text-muted"> Car: </span>
                            <span>{tripData.car.make}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-users"></i>
                            <span className="text-muted"> Seats: </span>
                            <span>{tripData.seatsTaken} out of {tripData.car.passengerCapacity}</span>
                        </Col>
                        <Col className="col-12 col-xl-6">
                            <i className="fas fa-tags"></i>
                            <span className="text-muted"> Price: </span>
                            <span>{tripData.pricePerPerson} lv</span>
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