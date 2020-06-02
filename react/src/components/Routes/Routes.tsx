import React, { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { UserContext } from "../../contexts/user/UserContext";
import UserLogged from "../auth/LogIn/logged-user-interface";

import PrivateRoute from "./PrivateRoute";

import Home from "../Home/Home";
import SignUp from "../auth/SignUp/SignUp";
import LogIn from "../auth/LogIn/LogIn";
import Recovery from "../auth/Recovery/Recovery";
import CreateCar from "../user/cars/CreateCar/CreateCar";
import MyCars from "../user/cars/MyCars/MyCars";
import CarDetails from "../user/cars/CarDetails/CarDetails";
import NotFound from "../errors/NotFound/NotFound";
import EditCar from "../user/cars/EditCar/EditCar";

import CreateTrip from "../user/trips/CreateTrip/CreateTrip";

interface Props {
    isLoggedIn: boolean,
    user: UserLogged,
}

const Routes: React.FC<Props> = ({ isLoggedIn, user }) => {
    return (
        <Fragment>
            <Switch>
                <Route path={"/"} exact component={Home} />
                <Route path="/sign-up" exact component={isLoggedIn ? Home : SignUp} />
                <Route path="/login" exact component={isLoggedIn ? Home : LogIn} />
                <Route path="/user/cars" exact component={MyCars} />
                <Route path="/user/cars/create-car" exact component={CreateCar} />
                <Route path="/user/cars/edit-car/:id" component={EditCar} />
                <Route path="/user/cars/details/:id" component={CarDetails} />
                <Route path="/not-found" exact component={NotFound} />
                <Route path="/user/trips/create" exact component={CreateTrip} />
            </Switch>
        </Fragment>
    );
};

export default Routes;