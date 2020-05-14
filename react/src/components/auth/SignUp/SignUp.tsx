import React, { Fragment } from "react";
import "../Auth.css";

import { Formik, Field } from "formik";
import { Form, InputGroup, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import schema from "./validation-schema";

const SignUp: React.FC = () => {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                username: '',
                email: "",
                password: "",
                confirmPassword: "",
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                    <Fragment>
                        <Form noValidate onSubmit={handleSubmit}>
                            <h1 className="form-title">Register</h1>
                            <Form.Group controlId="email">
                                <Form.Label>Email*</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field as={Form.Control}
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        isInvalid={touched.email && !!errors.email}
                                        isValid={touched.email && !errors.email}
                                    >
                                    </Field>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username*</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-user" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field as={Form.Control}
                                        type="text"
                                        name="username"
                                        value={values.username}
                                        isInvalid={touched.username && !!errors.username}
                                        isValid={touched.username && !errors.username}
                                    >
                                    </Field>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password*</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-lock" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field as={Form.Control}
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        isInvalid={touched.password && !!errors.password}
                                        isValid={touched.password && !errors.password}
                                    >
                                    </Field>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="confirmPasswrord">
                                <Form.Label>Confirm Password*</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-lock" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field as={Form.Control}
                                        type="password"
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                        isValid={touched.confirmPassword && !errors.confirmPassword}
                                    >
                                    </Field>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Col className="text-center">
                                <Button type="submit" variant="warning">Sign Up</Button>
                            </Col>
                        </Form>
                        <div className="auth-help">
                            <Link to="/login">
                                Have an acoount? Log in
                            </Link>
                        </div>
                    </Fragment>
                )}
        </Formik>
    );
}

export default SignUp;