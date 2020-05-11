import React from 'react';
import './App.css';
import { NavDropdown } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import Register from "./components/Register/Register";

function App() {
    return (
        <BrowserRouter>
            <div className="viewport">
                <Navigation />
                <Main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/sign-up" component={Register} />
                    </Switch>
                </Main>
            </div>
        </BrowserRouter>
    );
}

export default App;