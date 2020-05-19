import React, { Fragment, useMemo, useState, useContext } from "react";
import "../Auth.css";

import { Formik, Field } from "formik";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Col, FormGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

import { UserContext } from "../../../contexts/user/UserContext";

import Credentials from "./credentials-interface";


const LogIn: React.FC = () => {
    const history = useHistory();
    const [serverError, setServerError] = useState("");
    const { login } = useContext(UserContext);

    const onbSubmit = useMemo(() => ((credentials: Credentials) => {
        login(credentials)
            .then(() => {
                history.push("/");
            }).catch(() => {
                setServerError("Incorrect username or password");
            });
    }), [history, login]);

    return (
        <Formik
            onSubmit={onbSubmit}
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
                touched,
                errors,
            }) => (
                    <Fragment>
                        <Form noValidate onSubmit={handleSubmit}>
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
                                        isInvalid={touched.usernameEmail && !!serverError}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {serverError}
                                    </Form.Control.Feedback>
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