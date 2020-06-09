import React, { useState, useEffect } from "react";

import { useParams, useHistory } from "react-router-dom";

import CarForm from "../CarForm/CarForm";
import Car from "../car-interface";
import { OnSubmit, ImageChangeHandler } from "../CarForm/form-func-interfaces";

import carService from "../../../../services/car-service";
import serverValidationErrorHandler from "../../../../shared/errorhandler/server-validation-error-handler";

const defaultValues: Car = {
    make: "",
    model: "",
    passengerCapacity: -1,
    hasAirConditioning: false,
    hasLuggageSpace: false,
    canEat: false,
    canDrink: false,
    canSmoke: false,
    petsAllowed: false,
};

const EditCar: React.FC = () => {
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [carImage, setCarImage] = useState("");

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        carService.getCarDetails(id)
            .then(setInitialValues)
            .catch(() => {
                history.push("/not-found");
            });
    }, [history, id])

    const onSubmit: OnSubmit = (carData: Car, { setErrors }: any) => {
        const formData = new FormData();
        formData.append("file", carImage);
        formData.append("carId", id);
        formData.append("carData", JSON.stringify(carData));

        carService.editCar(formData)
            .then(() => {
                history.push(`/user/cars/details/${id}`);
            })
            .catch((err) => {
                serverValidationErrorHandler(err)
                    .then((errors) => setErrors({ ...errors }));
            });
    };

    const fileOnChange: ImageChangeHandler = (event: any) => {
        setCarImage(event.target.files[0]);
    };


    return <CarForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        imageChangeHandler={fileOnChange}
        formName="Edit Car"
    />
};

export default EditCar;