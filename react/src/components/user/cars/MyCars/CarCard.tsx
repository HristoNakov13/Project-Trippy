import React, { Fragment } from "react";
import "./CarCard.css";

import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import Car from "../car-interfaces";

interface Props {
}

const CarCard: React.FC<Props> = () => {
    return <Fragment>
        <Card>
            <Card.Img variant="top" src="https://g1-bg.cars.bg/2020-03-18_2/5e725a564cd10e6842316473b.jpg" />
            <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col>
                        <Button variant="outline-primary">Details</Button>
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