import React, { useEffect, useState, useMemo, Fragment } from "react";
import "./SearchTrips.css";

import { Formik } from "formik";
import { Form, Col, InputGroup, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';

import tripService from "../../../../services/trip-service";
import SelectMenu from "../../../../shared/components/SelectMenu/SelectMenu";
import SelectMenuValue from "../../../../shared/components/SelectMenu/select-menu-values-interface";
import SearchCity from "./search-trip-cities-interface";
import SearchTrip from "./search-trip-interface";
import schema from "./validation-schema";
import { MAX_PASSENGER_CAPACITY } from "../../cars/CarForm/car-validation-schema";
import TripCard from "../MyTrips/TripCard";
import MyTripModel from "../MyTrips/my-trip-interface";

const NO_RESULTS = "No results";

const SearchTrips: React.FC = () => {
    const [availableCities, setAvailableCities] = useState([] as Array<SearchCity>);
    const [tripsSearchResult, setTripsSearchResult] = useState([] as Array<MyTripModel>);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        tripService.getAvailableSearchCities()
            .then(setAvailableCities);
    }, []);

    const availableCitiesMemo = useMemo(() => (availableCities.map((city: SearchCity) => {
        return {
            id: city.id,
            value: city.name
        } as SelectMenuValue
    })), [availableCities]);

    const passengerCapacity = useMemo(() => (
        [...Array(MAX_PASSENGER_CAPACITY + 1).keys()]
            .slice(1)
            .map((num: number) => {
                return {
                    id: num,
                    value: num,
                } as SelectMenuValue
            })), []);

    const onSubmit = (searchData: SearchTrip) => {
        tripService.search(searchData)
            .then((res: Array<MyTripModel>) => {
                setHasSubmitted(true);
                setTripsSearchResult(res);
            })
            .catch(console.error);
    }

    return <Fragment>
        <Formik
            onSubmit={onSubmit}
            validationSchema={schema}
            initialValues={{
                from: "",
                to: "",
                departureDate: null,
                desiredSeats: 1,
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
                        <h1 className="page-title">Search Trips</h1>
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
                        <Form.Group controlId="startDate">
                            <Form.Label>Departure date</Form.Label>
                            <DatePicker
                                selected={values.departureDate}
                                name="departureDate"
                                onChange={date => setFieldValue("departureDate", date)}
                                placeholderText="Click to select a date"
                                dateFormat="dd-MM-yyyy"
                                minDate={new Date()}
                                maxDate={addDays(new Date(), 7)}
                                popperModifiers={{
                                    preventOverflow: {
                                        enabled: true,
                                    },
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="desiredSeats">
                            <Form.Label>Available seats</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fas fa-users"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <SelectMenu
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="desiredSeats"
                                    isInvalid={touched.desiredSeats && !!errors.desiredSeats}
                                    disabledOption="Number of needed seats..."
                                    values={passengerCapacity}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.desiredSeats}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Col className="text-center">
                            <Button type="submit" variant="success" >
                                Search
                        </Button>
                        </Col>
                    </Form>)}
        </Formik>
        <div className="search-result-container">
            {(hasSubmitted && tripsSearchResult.length === 0)
                ? <p className="no-results">{NO_RESULTS}</p>
                : tripsSearchResult.map((trip: MyTripModel) => {
                    return <TripCard tripData={trip} />
                })}
        </div>
    </Fragment>
};

export default SearchTrips;