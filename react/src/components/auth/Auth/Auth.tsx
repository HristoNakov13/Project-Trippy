import React, { Fragment, useContext, useEffect } from "react";

import { UserContext } from "../../../contexts/user/UserContext";

const Auth: React.FC = ({ children }) => {
    const { auth } = useContext(UserContext);

    //if auth is included as dependency it will constantly make requests
    useEffect(() => {
        auth();
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default Auth;