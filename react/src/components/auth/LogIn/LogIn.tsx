import React, { Fragment } from "react";
import "../Auth.css";

import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import { Form, Button, Col, FormGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";


const LogIn: React.FC = () => {
    return (
        <Formik
            onSubmit={console.log}
            initialValues={{
                usernameEmail: '',
                password: "",
                rememberMe: false,
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
            }) => (
                    <Fragment>
                        <Col className="text-center">
                            <h3>Log In</h3>
                        </Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email-username">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-user" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field as={Form.Control}
                                        type="text"
                                        name="usernameEmail"
                                        placeholder="email/username..."
                                        value={values.usernameEmail}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-lock" /></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Field as={Form.Control}
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        placeholder="password..."
                                    />
                                </InputGroup>
                            </Form.Group>
                            <FormGroup controlId="remember-me">
                                <Field
                                    as={Form.Check}
                                    type="checkbox"
                                    label="Remember me"
                                    name="rememberMe"
                                    checked={values.rememberMe}
                                />
                            </FormGroup>
                            <Col className="text-center">
                                <Button type="submit" variant="warning"><i className="fas fa-sign-in-alt" /> Log In</Button>
                            </Col>
                            <Link className="auth-help" to="/sign-up">
                                Create account
                            </Link>
                            <Link className="auth-help" to="/account-recovery">
                                Trouble logging in?
                            </Link>
                        </Form>
                    </Fragment>
                )}
        </Formik>
    )
};

export default LogIn;