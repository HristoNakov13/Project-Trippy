import * as yup from "yup";
import { EMAIL_REGEX } from "../../../auth/SignUp/validation-schema";

const MIN_DISPLAY_NAME_LENGTH = 3;
const MAX_DISPLAY_NAME_LENGTH = 20;

const SOCIAL_REGEX = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im;
const PHONE_NUMBER_REGEX = /^((\+359)|(0))([0-9]{9})$/;

const schema = yup.object({
    email: yup.string()
        .required("Email cannot be empty")
        .matches(EMAIL_REGEX, "Invalid email address"),

    displayName: yup.string()
        .min(MIN_DISPLAY_NAME_LENGTH, `Must be at least ${MIN_DISPLAY_NAME_LENGTH} characters`)
        .max(MAX_DISPLAY_NAME_LENGTH, `Cannot be more than ${MAX_DISPLAY_NAME_LENGTH} characters`),

    phoneNumber: yup.string()
        .matches(PHONE_NUMBER_REGEX, "Invalid phone number"),

    social: yup.string()
        .matches(SOCIAL_REGEX, "Invalid social media url"),
});

export default schema;