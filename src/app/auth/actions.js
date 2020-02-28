import { authActionTypes } from "./types";
import { authService } from "./services";

export const authActions = {
  login,
  logout
};

function login(email, password) {
    return dispatch => {
        dispatch(request());
        return authService.login(email, password).then(payload => {
            dispatch(success(payload));
        }).catch(err => {
            dispatch(failure(err));
        })
    }
}

function logout() {
    authService.logout();
}

// action creators
export const request = () => ({type: authActionTypes.LOGIN_REQUEST});
export const success = (payload) => ({type: authActionTypes.LOGIN_SUCCESS, payload});
export const failure = (error) => ({type: authActionTypes.LOGIN_FAILURE, error});
export const logoutStore = () => ({type: authActionTypes.LOG_OUT});
