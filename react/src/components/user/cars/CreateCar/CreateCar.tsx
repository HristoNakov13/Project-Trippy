import React, { useState } from "react";
import "./CreateCar.css";

import { Formik, Field } from "formik";

import { Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";


import Car from "../car-interfaces";

import userService from "../../../../services/user-service";
import http from "../../../../util/requester";


const CreateCar: React.FC = () => {
    const [carImage, setCarImage] = useState("");
    const history = useHistory();

    const fileOnChange = (event: any) => {
        setCarImage(event.target.files[0]);
    };

    const onSubmit = (carData: Car) => {
        userService.createCar(carData).then((res) => {
            if (!carImage) {
                history.push("/");

                return;
            }

            const formData = new FormData();
            formData.append("file", carImage);
            formData.append("carId", res.id);

            userService.uploadCarImage(formData)
                .then(() => {
                    history.push("/");
                })
                .catch(console.error);
        }).catch(console.error)
    };

    return (
        <Formik
            onSubmit={onSubmit}
            initialValues={{
                make: "",
                model: "",
                passengerCapacity: -1,
                hasAirConditioning: false,
                hasLuggageSpace: false,
                canEat: false,
                canDrink: false,
                canSmoke: false,
                petsAllowed: false,
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
                        <h1 className="form-title">Create car</h1>
                        <Form.Row className="justify-content-md-auto">
                            <Form.Group as={Col} controlId="make">
                                <Form.Label>Make</Form.Label>
                                <Field as={Form.Control} type="text" name="make" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="model">
                                <Form.Label>Model</Form.Label>
                                <Field as={Form.Control} type="text" name="model" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="color">
                            <Form.Label>Color</Form.Label>
                            <Field as={Form.Control} type="text" name="color" />
                        </Form.Group>

                        <Form.Group controlId="available-seats">
                            <Form.Label>Number of seats</Form.Label>
                            <Form.Control as="select" onChange={handleChange} name="passengerCapacity">
                                <option selected disabled>Passanger capacity...</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </Form.Control>
                        </Form.Group>
                        <span className="checkbox-group-label">Allowed items and activities:</span>
                        <Form.Row className="mb-3">
                            <Col>
                                <Row>
                                    <Col className="col-12 col-lg-6">
                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" id="food" name="canEat" />
                                            <label className="form-check-label" htmlFor="food"><i className="fas fa-utensils"></i>  Food</label>
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-lg-6">
                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" id="drinks" name="canDrink" />
                                            <label className="form-check-label" htmlFor="drinks"><i className="fas fa-wine-bottle"></i> Drinks</label>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-12 col-lg-6">
                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" id="pets" name="petsAllowed" />
                                            <label className="form-check-label" htmlFor="pets"><i className="fas fa-paw"></i> Pets</label>
                                        </div>

                                    </Col>
                                    <Col className="col-12 col-lg-6">
                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" id="smoking" name="canSmoke" />
                                            <label className="form-check-label" htmlFor="smoking"><i className="fas fa-smoking"></i> Smoking</label>
                                        </div>

                                    </Col>
                                </Row>
                            </Col>
                        </Form.Row>
                        <span className="checkbox-group-label">Car features:</span>
                        <Form.Row className="mb-3">
                            <Col>
                                <Row>
                                    <Col className="col-12 col-lg-6">
                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" id="AC" name="hasAirConditioning" />
                                            <label className="form-check-label" htmlFor="AC"><i className="fas fa-snowflake"></i> Air Conditioning</label>
                                        </div>
                                    </Col>
                                    <Col className="col-12 col-lg-6">
                                        <div className="form-check">
                                            <Field className="form-check-input" type="checkbox" id="luggage" name="hasLuggageSpace" />
                                            <label className="form-check-label" htmlFor="luggage"><i className="fas fa-suitcase"></i> Luggage space</label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Row>
                        <Form.File id="formcheck-api-regular">
                            <Form.File.Label>Car picture</Form.File.Label>
                            <Form.File.Input onChange={fileOnChange} />
                        </Form.File>
                        <div className="button-wrap">
                            <Button type="submit" variant="warning">Create Car</Button>
                        </div>
                    </Form>
                )}
        </Formik>
    );
};

export default CreateCar;