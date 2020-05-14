import React from "react";
import "./CreateCar.css";

import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";


const CreateCar: React.FC = () => {
    return (
        <Formik
            onSubmit={console.log}
            initialValues={{
                food: false,
                drinks: false,
            }}
        >
            {({
                handleChange,
                handleSubmit,
                handleBlur,
                values,
                errors,
            }) => (
                    <Form onSubmit={handleSubmit}>
                        <h1>Create car</h1>
                        <Form.Row className="justify-content-md-auto">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Make</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Color</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group controlId="available-seats">
                            <Form.Label>Number of seats</Form.Label>
                            <Form.Control as="select">
                                <option selected disabled>Passanger capacity...</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Form.Control>
                        </Form.Group>
                            <span className="checkbox-group-label">Allowed items and activities in your car:</span>

                        <Form.Row className="mb-3">
                            <Col>
                                <Row>
                                    <Col className="col-12 col-lg-6">
                                        <Form.Group controlId="food">
                                            <Form.Check type="checkbox" label="Food" />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-12 col-lg-6">
                                        <Form.Group controlId="drinks">
                                            <Form.Check type="checkbox" label="Drinks" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-12 col-lg-6">
                                        <Form.Group controlId="smoking">
                                            <Form.Check type="checkbox" label="Smoking" />
                                        </Form.Group>
                                    </Col>
                                    <Col className="col-12 col-lg-6">
                                        <Form.Group controlId="pets">
                                            <Form.Check type="checkbox" label="Pets" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Row>
                    </Form>
                )}
        </Formik>
    );
};

export default CreateCar;