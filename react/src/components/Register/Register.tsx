import React from "react";
import "./Register.css";

import { Formik, Field } from "formik";
import { Form, InputGroup, Button, Col } from "react-bootstrap";

import schema from "./validation-schema";

const Register: React.FC = () => {
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
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Label>Email*</Form.Label>
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
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username*</Form.Label>
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
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password*</Form.Label>
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
                        </Form.Group>
                        <Form.Group controlId="confirmPasswrord">
                            <Form.Label>Confirm Password*</Form.Label>
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
                        </Form.Group>
                        <Col className="text-center">
                            <Button type="submit" variant="warning">Sign up</Button>
                        </Col>
                    </Form>
                )}
        </Formik>
    );
}

export default Register;