import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import SignUp from "./components/auth/SignUp/SignUp";
import LogIn from "./components/auth/LogIn/LogIn";
import Recovery from "./components/auth/Recovery/Recovery";
import CreateCar from "./components/user/cars/CreateCar/CreateCar";

function App() {
    return (
        <BrowserRouter>
            <div className="viewport">
                <Header />
                <Main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route exact path="/login" component={LogIn} />
                        <Route exact path="/account-recovery" component={Recovery} />
                        <Route exact path="/user/cars/create-car" component={CreateCar} />
                    </Switch>
                </Main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;