import * as yup from "yup";

export const MAX_PRICE_PER_PERSON = 100;
export const MAX_ESTIMATED_TRAVEL_TIME = 12;

const MIN_PRICE_PER_PERSON = 0;
const MIN_ESTIMATED_TRAVEL_TIME = 1;
const MAX_ADDITIONAL_INFO_LENGTH = 255;


const schema = yup.object({
    from: yup.string()
        .required("From is required"),

    to: yup.string()
        .required("To is required"),

    car: yup.string()
        .required("Car is required"),

    pricePerPerson: yup.number()
        .min(MIN_PRICE_PER_PERSON, `Minimum price is ${MIN_PRICE_PER_PERSON}`)
        .max(MAX_PRICE_PER_PERSON, `Maximum price is ${MAX_PRICE_PER_PERSON}`),

    estimatedTravelTime: yup.number()
        .min(MIN_ESTIMATED_TRAVEL_TIME, `Minimum travel time is ${MIN_ESTIMATED_TRAVEL_TIME}`)
        .max(MAX_ESTIMATED_TRAVEL_TIME, `Maximum travel time is ${MAX_ESTIMATED_TRAVEL_TIME}`),

    additionalInfo: yup.string()
        .max(MAX_ADDITIONAL_INFO_LENGTH, `Text cannot be more than ${MAX_ADDITIONAL_INFO_LENGTH} characters`),
});

export default schema;