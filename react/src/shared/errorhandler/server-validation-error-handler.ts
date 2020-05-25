import HttpError from "../../util/errors/http-error";
import ResponseError from "./response-error";

interface LooseObject {
    [key: string]: string
}

const serverValidationErrorHandler = (httpError: HttpError, setErrors: any) => {
    httpError.res.json()
        .then((errorData) => {
            const serverErrors: LooseObject = {};
            errorData.errors.forEach((err: ResponseError) => {
                serverErrors[err.property] = err.message;
            });
            setErrors({ ...serverErrors });
        });
};

export default serverValidationErrorHandler;