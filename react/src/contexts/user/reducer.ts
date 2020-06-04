import Action from "../action-interface";
import actions from "./actions";

const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case actions.login:
            return {
                user: action.payload
            };
        case actions.authSuccess:
            return {
                user: action.payload
            };
        case actions.authFailure:
            return {
                users: action.payload
            }
        case actions.logout:
            return {
                users: action.payload
            }
        default:
            return state;
    };
};

export default reducer;