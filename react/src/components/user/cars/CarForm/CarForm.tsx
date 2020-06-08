import React, { useMemo } from "react";

import { Formik, Field } from "formik";
import { Form, Col, Row, Button } from "react-bootstrap";

import Car from "../car-interface";
import { OnSubmit, ImageChangeHandler } from "./form-func-interfaces";
import schema, { MAX_PASSENGER_CAPACITY } from "./car-validation-schema";

interface Props {
    onSubmit: OnSubmit,
    imageChangeHandler: ImageChangeHandler,
    initialValues: Car,
    formName: string,
}

const CarForm: React.FC<Props> = ({ onSubmit, imageChangeHandler, initialValues, formName }) => {
    //renders options for the passenger capcity select menu
    //if the current option value is equal to the initial value(for edit car form) it is set as selected
    //otherwise in the creat car form the default disabled option is selected
    const selectMenu = useMemo(() => ((passangerCapacity: number) => {
        const options = Array.from(Array(MAX_PASSENGER_CAPACITY).keys())

        return options.map((element: any, index: number) => {
            const value = index + 1;
            return <option value={value} selected={value === passangerCapacity}>{value}</option>
        })
    }), []);

    return (
        <Formik
            enableReinitialize={true}
            onSubmit={onSubmit}
            validationSchema={schema}
            initialValues={{ ...initialValues }}
        >
            {({
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                values,
                errors,
            }) => (
                    <Form onSubmit={handleSubmit}>
                        <h1 className="page-title">{formName}</h1>
                        <Form.Row className="justify-content-md-auto">
                            <Form.Group as={Col} controlId="make">
                                <Form.Label>Make*</Form.Label>
                                <Field as={Form.Control} type="text" name="make" isInvalid={touched.make && !!errors.make} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.make}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="model">
                                <Form.Label>Model*</Form.Label>
                                <Field as={Form.Control} type="text" name="model" value={values.model} isInvalid={touched.model && !!errors.model} />

                                <Form.Control.Feedback type="invalid">
                                    {errors.model}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="color">
                            <Form.Label>Color</Form.Label>
                            <Field as={Form.Control} type="text" name="color" />
                        </Form.Group>

                        <Form.Group controlId="available-seats">
                            <Form.Label>Number of seats*</Form.Label>
                            <Form.Control as="select"
                                onChange={handleChange} onBlur={handleBlur} name="passengerCapacity" isInvalid={touched.passengerCapacity && !!errors.passengerCapacity}>
                                <option selected={values.passengerCapacity < 0} disabled>Passanger capacity...</option>
                                {selectMenu(values.passengerCapacity)}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.passengerCapacity}
                            </Form.Control.Feedback>
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
                            <Form.File.Input onChange={imageChangeHandler} />
                        </Form.File>
                        <div className="button-wrap">
                            <Button type="submit" variant="warning">{formName}</Button>
                        </div>
                    </Form>
                )}
        </Formik>
    );
};

export default CarForm;