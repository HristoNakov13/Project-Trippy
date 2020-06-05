import React, { useContext } from "react";

import Header from "../navigation/Header"
import Footer from "../navigation/Footer"
import Main from "../Main/Main"
import Routes from "../routes/Routes";

import { UserContext } from "../../contexts/user/UserContext";

const ViewPort: React.FC = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    return (
        <div className="viewport">
            <Header isLoggedIn={isLoggedIn} user={user} />
            <Main>
                <Routes isLoggedIn={isLoggedIn} user={user} />
            </Main>
            <Footer />
        </div>
    )
};

export default ViewPort;