import React from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";

import UserContextProvider from "./contexts/user/UserContext";
import Auth from "./components/auth/Auth/Auth";
import ViewPort from "./components/ViewPort/ViewPort";

function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Auth>
                    <ViewPort />
                </Auth>
            </UserContextProvider>
        </BrowserRouter>
    );
}

export default App;