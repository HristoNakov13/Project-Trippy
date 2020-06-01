import React, { useEffect, useState } from "react";

import { Formik, Field } from "formik";
import { Form, Button, Col, InputGroup } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

import TripCreate from "../trip-create-interface";
import schema from "./validation-schema";
import tripService from "../../../../services/trip-service";
import CreateTripFormData, { CarsFormData, CitiesFormData } from "../CreateTrip/create-trip-form-data";



const TripForm: React.FC = () => {
    const [availableCars, setAvailableCars] = useState([] as Array<CarsFormData>);
    const [availableCities, setAvailableCities] = useState([] as Array<CitiesFormData>);

    useEffect(() => {
        tripService.getCreateTripFormData()
            .then((res: CreateTripFormData) => {
                setAvailableCars(res.cars);
                setAvailableCities(res.cities);
            });
    }, []);

    //would it be better to merge those two?
    const populateCitiesMenu = (cities: Array<CitiesFormData>, selectedValue: string) => {
        return cities.map((city: CitiesFormData) => {
            return <option
                selected={city.name === selectedValue}
                value={city.id}
            >
                {city.name}
            </option>
        });
    };

    const populateCarsMenu = (cars: Array<CarsFormData>, selectedValue: string) => {
        return cars.map((car: CarsFormData) => {
            const carValue = `${car.make} - ${car.model}`;

            return <option
                selected={carValue === selectedValue}
                value={car.id}
            >
                {carValue}
            </option>
        });
    };

    const onSubmit = (data: TripCreate) => {
        console.log(data);
    };

    return <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
            from: "",
            to: "",
            startDate: null,
            car: "",
            pricePerPerson: -1,
            additionalInfo: "",
            estimatedTravelTime: -1,
        }}
    >
        {({
            handleChange,
            handleSubmit,
            setFieldValue,
            handleBlur,
            touched,
            values,
            errors,
        }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col className="col-12 col-sm-6">
                            <Form.Group controlId="from">
                                <Form.Label>From*</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-map-marker-alt"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur} name="from"
                                        isInvalid={touched.from && !!errors.from}>
                                        <option selected disabled>Travel from...</option>
                                        {populateCitiesMenu(availableCities, values.from)}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.from}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col className="col-12 col-sm-6">
                            <Form.Group controlId="to">
                                <Form.Label>To*</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-map-marker-alt"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="select"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="to"
                                        isInvalid={touched.to && !!errors.to}>
                                        <option selected disabled>Travel to...</option>
                                        {populateCitiesMenu(availableCities, values.to)}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.to}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="car">
                        <Form.Label>Car*</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-car"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="car"
                                isInvalid={touched.car && !!errors.car}>
                                <option selected disabled>My Cars...</option>
                                {populateCarsMenu(availableCars, values.car)}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.car}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <Form.Label>Departure date and time*</Form.Label>
                        <DatePicker
                            selected={values.startDate}
                            name="startDate"
                            onChange={date => setFieldValue("startDate", date)}
                            placeholderText="Click to select a date"
                            dateFormat="dd-MM-yyyy / h:mm aa"
                            minDate={new Date()}
                            maxDate={addDays(new Date(), 7)}
                            showTimeSelect
                            popperModifiers={{
                                preventOverflow: {
                                    enabled: true,
                                },
                            }}
                        />
                    </Form.Group>
                    <Button type="submit" variant="success" >
                        Submit
                        </Button>
                </Form>)}
    </Formik>
};

export default TripForm;