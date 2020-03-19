import { userActionTypes } from "./types";
import { apiService } from "../../services/api";
import { errorActions } from "../errors";
import { apiUrls } from "../../services";

export const userActions = {
  getCurrentUser
};

function getCurrentUser() {
  return dispatch => {
    dispatch(requestAuthUser());
    return apiService.getData(apiUrls.API.CURRENT_AUTH_USER).then(user => {
      dispatch(getAuthUser(user));
    }).catch(err => {
      errorActions.add(err);
    });
  }
}

export const requestAuthUser = () => ({type: userActionTypes.REQUEST_AUTH_USER});
export const getAuthUser = user => ({type: userActionTypes.GET_AUTH_USER, user});
