import React, { useEffect, useState, useMemo } from "react";

import { Formik } from "formik";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import SelectMenu from "../../../../shared/components/SelectMenu/SelectMenu";
import SelectMenuValue from "../../../../shared/components/SelectMenu/select-menu-values-interface";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

import TripCreate from "../trip-create-interface";
import schema, { MAX_PRICE_PER_PERSON, MAX_ESTIMATED_TRAVEL_TIME } from "./validation-schema";
import tripService from "../../../../services/trip-service";
import CreateTripFormData, { CarsFormData, CitiesFormData } from "./create-trip-form-data";
import serverValidationErrorHandler from "../../../../shared/errorhandler/server-validation-error-handler";


const CreateTrip: React.FC = () => {
    const [availableCars, setAvailableCars] = useState([] as Array<CarsFormData>);
    const [availableCities, setAvailableCities] = useState([] as Array<CitiesFormData>);
    const history = useHistory();

    useEffect(() => {
        tripService.getCreateTripFormData()
            .then((res: CreateTripFormData) => {
                setAvailableCars(res.cars);
                setAvailableCities(res.cities);
            });
    }, []);

    const availableCitiesMemo = useMemo(() => (availableCities.map((city: CitiesFormData) => {
        return {
            id: city.id,
            value: city.name
        } as SelectMenuValue
    })), [availableCities]);

    const availableCarsMemo = useMemo(() => (availableCars.map((car: CarsFormData) => {
        return {
            id: car.id,
            value: `${car.make} - ${car.model}`
        } as SelectMenuValue
    })), [availableCars]);

    const onSubmit = (tripData: TripCreate, { setErrors }: any) => {
        tripService.createTrip(tripData)
            .then(() => {
                history.push("/user/trips");
            })
            .catch(err => {
                serverValidationErrorHandler(err)
                    .then((errors) => setErrors({ ...errors }));
            });
    };

    return <Formik
        onSubmit={onSubmit}
        validationSchema={schema}
        initialValues={{
            from: "",
            to: "",
            pricePerPerson: 0,
            estimatedTravelTime: 0,
            departureDate: null,
            additionalInfo: "",
            car: "",
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
                                    <SelectMenu
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="from"
                                        isInvalid={touched.from && !!errors.from}
                                        disabledOption="Travel from..."
                                        values={availableCitiesMemo}
                                    />
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
                                    <SelectMenu
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="to"
                                        isInvalid={touched.to && !!errors.to}
                                        disabledOption="Travel to..."
                                        values={availableCitiesMemo}
                                    />
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
                            <SelectMenu
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="car"
                                isInvalid={touched.car && !!errors.car}
                                disabledOption="My Cars..."
                                values={availableCarsMemo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.car}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <Form.Label>Departure date and time*</Form.Label>
                        <DatePicker
                            selected={values.departureDate}
                            name="departureDate"
                            onChange={date => setFieldValue("departureDate", date)}
                            placeholderText="Click to select a date"
                            dateFormat="dd-MM-yyyy / HH:mm aa"
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
                    <Form.Group controlId="price">
                        <Form.Label>Price per person*</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-tags"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                name="pricePerPerson"
                                placeholder="Price..."
                                defaultValue={0}
                                min={0}
                                max={MAX_PRICE_PER_PERSON}
                                isInvalid={touched.pricePerPerson && !!errors.pricePerPerson}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.pricePerPerson}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="travel-time">
                        <Form.Label>Estimated travel time</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="far fa-clock"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="number"
                                name="estimatedTravelTime"
                                placeholder="Travel time..."
                                defaultValue={0}
                                min={0}
                                max={MAX_ESTIMATED_TRAVEL_TIME}
                                isInvalid={touched.estimatedTravelTime && !!errors.estimatedTravelTime}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.estimatedTravelTime}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="additional-info">
                        <Form.Label>Additional info</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><i className="fas fa-info-circle"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                onChange={handleChange}
                                onBlur={handleBlur}
                                as="textarea"
                                name="additionalInfo"
                                placeholder="Anything youd like to add..."
                                isInvalid={touched.additionalInfo && !!errors.additionalInfo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.additionalInfo}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Col className="text-center">
                        <Button type="submit" variant="success" >
                            Submit
                        </Button>
                    </Col>
                </Form>)}
    </Formik>
};

export default CreateTrip;