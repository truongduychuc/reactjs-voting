import {authActionTypes} from "./types";
import Ls from "../../_helpers/ls";

let initialState = Ls.get('auth.access') ? {
    authenticated: true,
    payload: {
        access: Ls.get('auth.access')
    }
} : {authenticated: false, payload: {access: ''}};
initialState = {...initialState, ...{loggingIn: false}};

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.LOGIN_REQUEST:
            return {
                loggingIn: true
            };
        case authActionTypes.LOGIN_SUCCESS:
            return {
                authenticated: true,
                payload: action.payload
            };
        case authActionTypes.LOGIN_FAILURE:
            return {
                authenticated: false,
                error: action.error
            };
        case authActionTypes.LOG_OUT:
            return {
                authenticated: false
            };
        default:
            return state;
    }
};
