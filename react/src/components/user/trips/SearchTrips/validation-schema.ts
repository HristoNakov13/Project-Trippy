import * as yup from "yup";

const schema = yup.object({
    from: yup.number()
        .required("From is required"),

    to: yup.number()
        .required("To is required"),
});

export default schema;