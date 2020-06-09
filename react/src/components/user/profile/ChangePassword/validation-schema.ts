import * as yup from "yup";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../../../auth/SignUp/validation-schema";

const schema = yup.object({
    oldPassword: yup.string()
        .required("Old password is required"),

    newPassword: yup.string()
        .required("New password is required")
        .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
        .max(MAX_PASSWORD_LENGTH, `Password cannot be more than ${MAX_PASSWORD_LENGTH} characters`),

    confirmPassword: yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export default schema;
