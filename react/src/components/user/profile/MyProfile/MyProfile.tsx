import React, { Fragment, useEffect, useState } from "react";
import "./MyProfile.css";

import { Col, Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { Link, useHistory } from "react-router-dom";

import noImage from "../../../../static/images/no-image-icon.png";
import MyProfileDetails from "./my-profile-user-interface";
import userService from "../../../../services/user-service";

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

    const onSubmit = (userData: MyProfileDetails) => {
        const formData = new FormData();
        formData.append("image", userAvatar);
        formData.append("userData", JSON.stringify(userData));

        userService.editProfile(formData)
            .then(res => {
                console.log(res);
                history.push("/user/profile");
            })
            .catch(console.error);
    };

    console.log(userDetails);

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
                    <p className="proile-rating">RANKINGS : <span>8/10</span></p>
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
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label sm={2} column>
                                        Display name
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            name="displayName"
                                            value={values.displayName}
                                            placeholder="Global display name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label sm={2} column>
                                        Email
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            placeholder="Email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Col>
                                </Form.Group>
                                <Row>
                                    <span>Contacts:</span>
                                    <hr />
                                </Row>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label sm={2} column>
                                        Phone
                                </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            placeholder="Phone number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label sm={2} column>
                                        Instagram
                                </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            name="social"
                                            value={values.social}
                                            placeholder="Instagram profile url"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Edit Profile
                                </Button>
                            </Form>
                        )}
                </Formik>
            </Col>
        </Row>
    </Fragment>
};

export default MyProfile;