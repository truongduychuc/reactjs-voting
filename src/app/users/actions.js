import { userActionTypes } from "./types";
import apiService from "../../services/api";

export const userActions = {
  getCurrentUser
};

function getCurrentUser() {
  return dispatch => {
    return apiService.getData('http://localhost:8000/api/user/current').then(user => {
      dispatch(getAuthUser(user));
    });
  }
}

export const requestUserList = () => ({type: userActionTypes.REQUEST_USER_LIST});
export const getAuthUser = (user) => ({type: userActionTypes.GET_AUTH_USER, user});
export const successGetUserList = (data, meta) => ({type: userActionTypes.SUCCESS_GET_USER_LIST, users: data, meta});
