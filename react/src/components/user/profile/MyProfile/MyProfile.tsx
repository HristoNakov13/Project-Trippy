import React, { Fragment, useEffect, useState } from "react";
import "./MyProfile.css";

import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";

import noImage from "../../../../static/images/no-image-icon.png";
import MyProfileDetails from "./my-profile-user-interface";
import userService from "../../../../services/user-service";
import serverValidationErrorHandler from "../../../../shared/errorhandler/server-validation-error-handler";
import schema from "./validation-schema";

const MyProfile: React.FC = () => {
    const [userDetails, setUserDetails] = useState({} as MyProfileDetails);
    const [userAvatar, setUserAvatar] = useState("");
    const history = useHistory();

    useEffect(() => {
        userService.getMyProfileDetails()
            .then(setUserDetails)
            .catch(console.error)
    }, []);

    const imageChangeHandler = (event: any): void => {
        setUserAvatar(event.target.files[0]);
    };

    const onSubmit = (userData: MyProfileDetails, { setErrors }: any) => {
        const formData = new FormData();
        formData.append("image", userAvatar);
        formData.append("userData", JSON.stringify(userData));

        userService.editProfile(formData)
            .then(() => {
                history.push("/");
            })
            .catch(err => {
                serverValidationErrorHandler(err)
                    .then((errors) => setErrors({ ...errors }));
            });
    };

    const { username, imageSrc } = userDetails;

    return <Fragment>
        <Row>
            <Col md={4}>
                <div className="profile-img">
                    <img src={imageSrc ? imageSrc : noImage} alt="user avatar" />
                    <div className="file btn btn-lg btn-primary">
                        Change Avatar
                        <input onChange={imageChangeHandler} type="file" name="file" />
                    </div>
                </div>
            </Col>
            <Col md={6}>
                <div className="profile-head">
                    <h5>
                        {username}
                    </h5>
                    <Link className="anchor" to="/user/profile/change-password">
                        Change my password
                    </Link>
                </div>
            </Col>
        </Row>
        <Row>
            <div className="col-md-4">
                <div className="profile-nav">
                    <p>Cars</p>
                    <Link to="/user/cars/create-car">Create</Link><br />
                    <Link to="/user/cars/create-car">My Cars</Link><br />
                    <p>Trips</p>
                    <Link to="/user/cars/create-car">Create</Link><br />
                    <Link to="/user/cars/create-car">Search</Link><br />
                    <Link to="/user/cars/create-car">History</Link><br />
                </div>
            </div>
            <Col md={8}>
                <Formik
                    onSubmit={onSubmit}
                    initialValues={{ ...userDetails }}
                    validationSchema={schema}
                    enableReinitialize={true}
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
                                <Form.Group controlId="displayName">
                                    <Form.Label>
                                        Display name
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fas fa-user" /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="displayName"
                                            value={values.displayName}
                                            placeholder="Global display name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.displayName && !!errors.displayName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.displayName}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label >
                                        Email
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            placeholder="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.email && !!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="phoneNumber">
                                    <Form.Label>
                                        Phone
                                </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fas fa-mobile-alt" /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            placeholder="Phone number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="social">
                                    <Form.Label>
                                        Instagram
                                </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fab fa-instagram" /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            name="social"
                                            value={values.social}
                                            placeholder="Instagram profile url"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.social && !!errors.social}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.social}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Col className="text-center">
                                    <Button variant="warning" type="submit">
                                        <i className="fas fa-edit"></i> Save Changes
                                    </Button>
                                </Col>
                            </Form>
                        )}
                </Formik>
            </Col>
        </Row>
    </Fragment >
};

export default MyProfile;