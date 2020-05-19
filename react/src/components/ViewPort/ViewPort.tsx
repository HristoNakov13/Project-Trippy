import React, { useContext } from "react";

import Header from "../Navigation/Header"
import Footer from "../Navigation/Footer"
import Main from "../Main/Main"
import Routes from "../Routes/Routes";

import { UserContext } from "../../contexts/user/UserContext";

const ViewPort: React.FC = () => {
    const { isLoggedIn, user } = useContext(UserContext);
    return (
        <div className="viewport">
            <Header isLoggedIn={isLoggedIn} user={user} />
            <Main>
                <Routes isLoggedIn={isLoggedIn} user={user} />
            </Main>
            {/* <Footer /> */}
        </div>
    )
};

export default ViewPort;