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

interface Props {
    isLoggedIn: boolean,
    user: UserLogged,
}


const Routes: React.FC<Props> = ({ isLoggedIn, user }) => {
    console.log(isLoggedIn);
    return (
        <Fragment>
            <Switch>
                <Route path={"/"} exact component={Home} />
                <Route path="/sign-up" exact component={isLoggedIn ? Home : SignUp} />
                <Route path="/login" exact component={isLoggedIn ? Home : LogIn} />
            </Switch>
        </Fragment>
    );
};

export default Routes;