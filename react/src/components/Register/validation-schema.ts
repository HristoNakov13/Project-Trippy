import * as yup from "yup";

const schema = yup.object({
    username: yup.string()
        .required("Username is required")
        .min(5, "Must be at least 5 characters"),
    email: yup.string()
        .required("Email address is required")
        .email("Invalid email address"),
    password: yup.string()
        .required("Password is required")
        .min(6, "Must be at least 6 characters")
        .max(250, "Cannot be more than 250 characters"),
    confirmPassword: yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

export default schema;