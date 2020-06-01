import * as yup from "yup";

const schema = yup.object({
    from: yup.string()
        .required("required"),

    startDate: yup.date()
        .required("required"),
});

export default schema;