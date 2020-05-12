import * as yup from "yup";

const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 50;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 250;

const schema = yup.object({
    username: yup.string()
        .required("Username is required")
        .min(MIN_USERNAME_LENGTH, `Must be at least ${MIN_USERNAME_LENGTH} characters`)
        .max(MAX_USERNAME_LENGTH, `Cannot be more than ${MAX_USERNAME_LENGTH} characters`),
    email: yup.string()
        .required("Email address is required")
        .email("Invalid email address"),
    password: yup.string()
        .required("Password is required")
        .min(MIN_PASSWORD_LENGTH, `Must be at least ${MIN_PASSWORD_LENGTH} characters`)
        .max(MAX_PASSWORD_LENGTH, `Cannot be more than ${MAX_PASSWORD_LENGTH} characters`),
    confirmPassword: yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

export default schema;