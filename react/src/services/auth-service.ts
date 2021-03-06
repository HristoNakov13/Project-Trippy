import http from "../util/requester";
import CreateUser from "../components/auth/SignUp/create-user-interface";
import Credentials from "../components/auth/LogIn/credentials-interface";
import LoggedUser from "../components/auth/LogIn/logged-user-interface";

const AUTH_ROOT_URL = "/api/auth";

const END_POINTS = {
    usernameCheck: AUTH_ROOT_URL + "/availability-check/username",
    emailCheck: AUTH_ROOT_URL + "/availability-check/email",
    signUp: AUTH_ROOT_URL,
    login: AUTH_ROOT_URL + "/login",
    auth: AUTH_ROOT_URL,
    logout: AUTH_ROOT_URL + "/logout",
};

interface UsernameCheck {
    username: string
}

interface EmailCheck {
    email: string
}

const authService = {
    isTakenUsername: (username: UsernameCheck): Promise<boolean> => {
        return http.post(END_POINTS.usernameCheck, username);
    },

    isTakenEmail: (email: EmailCheck): Promise<boolean> => {
        return http.post(END_POINTS.emailCheck, email);
    },

    signUp: (userData: CreateUser): Promise<any> => {
        return http.post(END_POINTS.signUp, userData);
    },

    login: (credentials: Credentials): Promise<LoggedUser> => {
        return http.post(END_POINTS.login, credentials);
    },

    loguout: (): Promise<any> => {
        return http.get(END_POINTS.logout);
    },

    auth: (): Promise<LoggedUser> => {
        return http.get(END_POINTS.auth);
    }
};

export default authService;