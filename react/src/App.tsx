import React from 'react';
import './App.css';
import { NavDropdown } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";

function App() {
    return (
        <BrowserRouter>
            <div className="viewport">
                <Navigation />
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;