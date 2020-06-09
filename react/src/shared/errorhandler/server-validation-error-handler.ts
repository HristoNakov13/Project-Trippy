import HttpError from "../../util/errors/http-error";
import ResponseError from "./response-error";

interface LooseObject {
    [key: string]: string
}

const serverValidationErrorHandler = async (httpError: HttpError): Promise<LooseObject> => {
    return httpError.res.json()
        .then((errorData) => {
            const serverErrors: LooseObject = {};
            errorData.errors.forEach((err: ResponseError) => {
                serverErrors[err.property] = err.message;
            });

            return serverErrors;
        });
};

export default serverValidationErrorHandler;