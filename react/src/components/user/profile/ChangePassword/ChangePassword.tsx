import React from "react";

import { Formik, Field } from "formik";
import { Form, Col, Button, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import schema from "./validation-schema";
import ChangePasswordModel from "./change-password-interface";
import userService from "../../../../services/user-service";
import serverValidationErrorHandler from "../../../../shared/errorhandler/server-validation-error-handler";

const ChangePassword: React.FC = () => {
    const history = useHistory();

    const onSubmit = (passwords: ChangePasswordModel, { setErrors }: any) => {
        userService.changePassword(passwords)
            .then(res => {
                history.push("/user/profile");
            })
            .catch(err => {
                serverValidationErrorHandler(err)
                    .then((errors) => setErrors({ ...errors }));
            });
    };

    return <Formik
        onSubmit={onSubmit}
        initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        }}
        validationSchema={schema}
    >
        {({
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            values,
            touched,
        }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="oldPassword">
                        <h1 className="page-title">Change Password</h1>
                        <Form.Label>Old Password*</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-key"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field as={Form.Control}
                                name="oldPassword"
                                type="password"
                                placeholder="Old password"
                                isInvalid={touched.oldPassword && !!errors.oldPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.oldPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.Label>New Password*</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field as={Form.Control}
                                name="newPassword"
                                type="password"
                                placeholder="Password"
                                isInvalid={touched.newPassword && !!errors.newPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.newPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="confirmNewPassword">
                        <Form.Label>Confirm New Password*</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field as={Form.Control}
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm password"
                                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Col className="text-center">
                        <Button type="submit" variant="warning">Change Password</Button>
                    </Col>
                </Form>
            )}
    </Formik>
};

export default ChangePassword;