import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import SignUp from "./components/auth/SignUp/SignUp";
import LogIn from "./components/auth/LogIn/LogIn";
import Recovery from "./components/auth/Recovery/Recovery";

function App() {
    return (
        <BrowserRouter>
            <div className="viewport">
                <Navigation />
                <Main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route exact path="/login" component={LogIn} />
                        <Route exact path="/account-recovery" component={Recovery} />
                    </Switch>
                </Main>
            </div>
        </BrowserRouter>
    );
}

export default App;