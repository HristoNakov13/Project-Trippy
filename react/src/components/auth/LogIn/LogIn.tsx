import React, { Fragment } from "react";
import "../Auth.css";

import { Formik, Field } from "formik";
import { Link } from "react-router-dom";
import { Form, Button, Col, FormGroup, Row } from "react-bootstrap";
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
                        <Form onSubmit={handleSubmit}>
                            <h1 className="form-title">Log In</h1>
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
                        </Form>
                        <div className="auth-help">
                            <Link className="anchor" to="/sign-up">
                                Create account
                            </Link>
                            <Link className="anchor" to="/account-recovery">
                                Trouble logging in?
                            </Link>
                        </div>
                    </Fragment>
                )}
        </Formik>
    )
};

export default LogIn;