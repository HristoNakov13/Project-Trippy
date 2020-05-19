import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
    isExactPath?: boolean
    path: string;
    component: React.FC;
}

const PrivateRoute: React.FC<Props> = ({ isLoggedIn, path, isExactPath = true, component, ...props }) => {
    return (
        <Fragment>
            {isLoggedIn
                ? <Route path={path} exact={isExactPath} component={component} />
                : <Redirect to={"/login"} />
            }
        </Fragment>
    );
};

export default PrivateRoute;