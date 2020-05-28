import * as yup from "yup";

const MIN_MAKE_LENGTH = 2;
const MAX_MAKE_LENGTH = 30;


const MIN_MODEL_LENGTH = 2;
const MAX_MODEL_LENGTH = 30;


const MIN_PASSENGER_CAPACITY = 1;
export const MAX_PASSENGER_CAPACITY = 5;


const schema = yup.object({
    make: yup.string()
        .required("Make is required")
        .min(MIN_MAKE_LENGTH, `Must be at least ${MIN_MAKE_LENGTH} characters`)
        .max(MAX_MAKE_LENGTH, `Cannot be more than ${MAX_MAKE_LENGTH} characters`),

    model: yup.string()
        .required("Model is required")
        .min(MIN_MODEL_LENGTH, `Must be at least ${MIN_MODEL_LENGTH} characters`)
        .max(MAX_MAKE_LENGTH, `Cannot be more than ${MAX_MODEL_LENGTH} characters`),

    //initial passenger value is -1, if its not changed min check is fired and displayed
    passengerCapacity: yup.number()
        .min(MIN_PASSENGER_CAPACITY, `Passenger capacity is required`)
        .max(MAX_PASSENGER_CAPACITY, `Cannot be more than ${MAX_PASSENGER_CAPACITY}`),
});

export default schema;