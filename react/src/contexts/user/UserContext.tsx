import React, { createContext, useMemo, useReducer } from "react";

import LoggedUser from "../../components/auth/LogIn/logged-user-interface";
import Credentials from "../../components/auth/LogIn/credentials-interface";

import reducer from "./reducer";
import actions from "./actions";
import authService from "../../services/auth-service";

export const UserContext = createContext({} as any);

const UserContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {} as any);

    const login = (credentials: Credentials) => {
        return authService.login(credentials)
            .then((userData: LoggedUser) => {
                dispatch({ type: actions.login, payload: userData });
            });
    };

    const auth = () => {
        authService.auth()
            .then((userData: LoggedUser) => {
                dispatch({ type: actions.authSuccess, payload: userData });
            })
            .catch(() => {
                dispatch({ type: actions.authFailure, payload: null });
            });
    };

    const isLoggedIn: boolean = useMemo(() => !!state.user, [state.user]);

    const logout = () => {
        return authService.loguout()
            .then(res => {
                dispatch({type: actions.logout, payload: null});

                return res;
            });
    };

    return (
        <UserContext.Provider
            value={
                {
                    login,
                    user: state.user,
                    isLoggedIn,
                    auth,
                    logout,
                }}
        >
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;