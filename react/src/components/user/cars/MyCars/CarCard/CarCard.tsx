import React, { Fragment } from "react";
import "./CarCard.css";

import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import noImage from "../../../../../static/images/no-image-icon.png";

import CarListModel from "../car-list-interface";

interface Props {
    car: CarListModel
}

const CarCard: React.FC<Props> = ({ car }) => {
    return <Fragment>
        <Card>
            <Card.Img variant="top" src={car.imageSrc ? car.imageSrc : noImage} alt="user's car picture" />
            <Card.Body>
                <Card.Title>{car.make}</Card.Title>
                <Card.Text>
                    <span>Model: {car.model}</span>
                    <br />
                    <span>Seats: {car.passengerCapacity}</span>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button as={Link} to={`/user/cars/details/${car.id}`} variant="outline-primary">Details</Button>
                    </Col>
                    <Col>
                        <div className="favorite-car">
                            <i className="fas fa-star"></i>
                        </div>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    </Fragment>
};

export default CarCard;