import { apiService, apiUrls } from "../../services";
import { creator as errorCreator } from "../errors";
import { creator } from "./actions";


export const consumer = {
  getCurrentUser
};


function getCurrentUser() {
  return dispatch => {
    dispatch(creator.request());
    return apiService.getData(apiUrls.API.CURRENT_AUTH_USER).then(user => {
      dispatch(creator.successRequest(user));
    }).catch(err => {
      dispatch(creator.failed());
      dispatch(errorCreator.push(err));
    });
  }
}
