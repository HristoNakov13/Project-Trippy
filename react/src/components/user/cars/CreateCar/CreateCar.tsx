import React, { useState } from "react";
import "./CreateCar.css";

import { useHistory } from "react-router-dom";

import CarForm from "../CarForm/CarForm";
import Car from "../car-interface";
import { OnSubmit, ImageChangeHandler } from "../CarForm/form-func-interfaces";
import carService from "../../../../services/car-service";
import serverValidationErrors from "../../../../shared/errorhandler/server-validation-error-handler";

const CreateCar: React.FC = () => {
    const [carImage, setCarImage] = useState("");
    const history = useHistory();
    const initialValues: Car = {
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

    const imageChangeHandler: ImageChangeHandler = (event: any): void => {
        setCarImage(event.target.files[0]);
    };

    const onSubmit: OnSubmit = (carData: Car, { setErrors }: any): void => {
        const formData = new FormData();

        if (!!carImage) {
            formData.append("file", carImage);
        }

        formData.append("carData", JSON.stringify(carData));

        carService.createCar(formData)
            .then((res) => {
                history.push("/user/cars");
            })
            .catch(err => {
                serverValidationErrors(err)
                    .then((errors) => setErrors({ ...errors }));
            });
    };

    return <CarForm
        onSubmit={onSubmit}
        imageChangeHandler={imageChangeHandler}
        initialValues={initialValues}
        formName="Create Car"
    />
};

export default CreateCar;