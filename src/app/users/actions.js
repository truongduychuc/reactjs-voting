import { userActionTypes } from "./types";
import apiService from "../../services/api";

export const userActions = {
  getCurrentUser
};

function getCurrentUser() {
  return dispatch => {
    dispatch(requestAuthUser());
    return apiService.getData('http://localhost:8000/api/user/current').then(user => {
      dispatch(getAuthUser(user));
    }).catch(err => {
      dispatch(errorAuthUser(err))
    });
  }
}
export const requestAuthUser = () => ({type: userActionTypes.REQUEST_AUTH_USER});
export const errorAuthUser = (error) => ({type: userActionTypes.ERROR_AUTH_USER,  error});
export const requestUserList = () => ({type: userActionTypes.REQUEST_USER_LIST});
export const getAuthUser = (user) => ({type: userActionTypes.GET_AUTH_USER, user});
export const successGetUserList = (data, meta) => ({type: userActionTypes.SUCCESS_GET_USER_LIST, users: data, meta});
