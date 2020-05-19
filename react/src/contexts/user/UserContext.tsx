import React, { createContext, useMemo, useReducer } from "react";

import LoggedUser from "../../components/auth/LogIn/logged-user-interface";
import Credentials from "../../components/auth/LogIn/credentials-interface";

import reducer from "./reducer";
import actions from "./actions";
import userService from "../../services/user-service";

export const UserContext = createContext({} as any);

const UserContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {} as any);

    const login = (credentials: Credentials) => {
        return userService.login(credentials)
            .then((userData: LoggedUser) => {
                dispatch({ type: actions.login, payload: userData });
            });
    };

    const auth = () => {
        userService.auth()
            .then((userData: LoggedUser) => {
                dispatch({type: actions.authSuccess, payload: userData});
            })
            .catch(() => {
                dispatch({type: actions.authFailure, payload: null});
            });
    };

    const isLoggedIn: boolean = useMemo(() => !!state.user, [state.user]);

    return (
        <UserContext.Provider
            value={
                {
                    login,
                    user: state.user,
                    isLoggedIn,
                    auth
                }}
        >
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;