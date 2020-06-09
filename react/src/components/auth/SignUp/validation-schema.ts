import * as yup from "yup";
import authService from "../../../services/auth-service";

const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 50;

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 250;

export const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

//currently at a loss how to debounce availability requests for email and username coupled with formik and yup

const schema = yup.object({
    username: yup.string()
        .required("Username is required")
        .min(MIN_USERNAME_LENGTH, `Must be at least ${MIN_USERNAME_LENGTH} characters`)
        .max(MAX_USERNAME_LENGTH, `Cannot be more than ${MAX_USERNAME_LENGTH} characters`)
        .test('checkDuplUsername', 'Username is taken', function (username: string) {
            if (!username
                || username.length < MIN_USERNAME_LENGTH
                || username.length > MAX_USERNAME_LENGTH) {

                return false;
            }
            
            //isTakenUsername returns true if username is taken and false if its not
            //because of that the resp value is flipped to fit the validation
            //
            //To pass the validation a true value for "resolve" is required  
            //but a "resp" with true from the userService response means the username is taken
            //and thats where the flip comes in
            return new Promise((resolve, reject) => {
                authService.isTakenUsername({ username })
                    .then((resp) => {
                        resolve(!resp);
                    });
            });
        }),
    email: yup.string()
        .required("Email address is required")
        .matches(EMAIL_REGEX, "Invalid email address")
        .test('checkDuplEmail', 'Email is taken', function (email: string) {
            if (!email) {
                return false;
            }

            //same boolean value flip applies to email as in username
            return new Promise((resolve, reject) => {
                authService.isTakenEmail({ email })
                    .then((resp) => {
                        resolve(!resp);
                    });
            });
        }),
    password: yup.string()
        .required("Password is required")
        .min(MIN_PASSWORD_LENGTH, `Must be at least ${MIN_PASSWORD_LENGTH} characters`)
        .max(MAX_PASSWORD_LENGTH, `Cannot be more than ${MAX_PASSWORD_LENGTH} characters`),
    confirmPassword: yup.string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
});

export default schema;