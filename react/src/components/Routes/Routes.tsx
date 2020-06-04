import React, { Fragment, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { UserContext } from "../../contexts/user/UserContext";
import UserLogged from "../auth/LogIn/logged-user-interface";

import PrivateRoute from "./PrivateRoute";

import Home from "../Home/Home";
import NotFound from "../errors/NotFound/NotFound";

import SignUp from "../auth/SignUp/SignUp";
import LogIn from "../auth/LogIn/LogIn";
import Recovery from "../auth/Recovery/Recovery";

import CreateCar from "../user/cars/CreateCar/CreateCar";
import MyCars from "../user/cars/MyCars/MyCars";
import CarDetails from "../user/cars/CarDetails/CarDetails";
import EditCar from "../user/cars/EditCar/EditCar";

import CreateTrip from "../user/trips/CreateTrip/CreateTrip";
import MyTrips from "../user/trips/MyTrips/MyTrips";
import TripDetails from "../user/trips/TripDetails/TripDetails";

interface Props {
    isLoggedIn: boolean,
    user: UserLogged,
}

const Routes: React.FC<Props> = ({ isLoggedIn, user }) => {
    return (
        <Fragment>
            <Switch>
                <Route path={"/"} exact component={Home} />
                <Route path="/not-found" exact component={NotFound} />


                <Route path="/sign-up" exact render={() => (
                    isLoggedIn
                        ? <Redirect to="/" /> 
                        : <SignUp />
                )} />
                <Route path="/login" exact render={() => (
                    isLoggedIn
                        ? <Redirect to="/" /> 
                        : <LogIn />
                )} />

                <PrivateRoute path="/user/cars" isLoggedIn={isLoggedIn} component={MyCars} />
                <PrivateRoute path="/user/cars/create-car" isLoggedIn={isLoggedIn} component={CreateCar} />
                <PrivateRoute path="/user/cars/edit-car/" param="id" isLoggedIn={isLoggedIn} component={EditCar} />
                <PrivateRoute path="/user/cars/details/" param="id" isLoggedIn={isLoggedIn} component={CarDetails} />


                <PrivateRoute path="/user/trips/create" isLoggedIn={isLoggedIn} component={CreateTrip} />
                <PrivateRoute path="/user/trips" isLoggedIn={isLoggedIn} component={CreateTrip} />
                <PrivateRoute path="/trips/details/" param="id" isLoggedIn={isLoggedIn} isExactPath={false} component={TripDetails} />
            </Switch>
        </Fragment>
    );
};

export default Routes;