import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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

import MyProfile from "../user/profile/MyProfile/MyProfile";

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

                <Route path="/account-recovery" exact render={() => (
                    isLoggedIn
                        ? <Redirect to="/" />
                        : <Recovery />
                )} />

                {/* for some reason PrivateRoute switching from url to url bugs when the root url is similar and its not due to "exact" or "param" props mishandling */}
                {/* going with render to hide the car routes at this point */}

                <Route path="/user/cars" exact render={() => (
                    isLoggedIn
                        ? <MyCars />
                        : <Redirect to="/" />
                )} />

                <Route path="/user/cars/create-car" exact render={() => (
                    isLoggedIn
                        ? <CreateCar />
                        : <Redirect to="/" />
                )} />

                <Route path="/user/cars/edit-car/:id" render={() => (
                    isLoggedIn
                        ? <EditCar />
                        : <Redirect to="/" />
                )} />

                <Route path="/user/cars/details/:id" render={() => (
                    isLoggedIn
                        ? <CarDetails />
                        : <Redirect to="/" />
                )} />


                <PrivateRoute path="/user/trips/create" isLoggedIn={isLoggedIn} component={CreateTrip} />
                <PrivateRoute path="/user/trips" isLoggedIn={isLoggedIn} component={MyTrips} />
                <PrivateRoute path="/trips/details/" param="id" isLoggedIn={isLoggedIn} isExactPath={false} component={TripDetails} />

                <PrivateRoute path="/user/profile" isLoggedIn={isLoggedIn} component={MyProfile} />
            </Switch>
        </Fragment>
    );
};

export default Routes;