import React from "react";

import { Formik, Field } from "formik";

import { Form, Button, Col } from "react-bootstrap";

const TripForm: React.FC = () => {
    return <Formik
        onSubmit={(data) => {
            console.log(data);
        }}
        initialValues={{}}
    >
        {({
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                values,
                errors,
            }) => (
        <Form>
            <Form.Row>
                <Form.Group controlId="from">
                    <Form.Label>From*</Form.Label>
                    <Form.Control as="select"
                        onChange={handleChange} onBlur={handleBlur} name="passengerCapacity" isInvalid={touched.passengerCapacity && !!errors.passengerCapacity}>
                        <option selected={values.passengerCapacity < 0} disabled>Passanger capacity...</option>
                        {selectMenu(values.passengerCapacity)}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.passengerCapacity}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="from">
                    <Form.Label>From*</Form.Label>
                    <Form.Control as="select"
                        onChange={handleChange} onBlur={handleBlur} name="passengerCapacity" isInvalid={touched.passengerCapacity && !!errors.passengerCapacity}>
                        <option selected={values.passengerCapacity < 0} disabled>Passanger capacity...</option>
                        {selectMenu(values.passengerCapacity)}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {errors.passengerCapacity}
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Form.Row>

            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
    </Button>
        </Form>)}
    </Formik>
};

export default TripForm;