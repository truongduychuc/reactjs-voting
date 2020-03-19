import { errorActionTypes } from "./types";
import { HTTP } from "./statusCodes";

export const errorActions = {
  add: addError,
  clear: clearError
};

export function hasUnauthorizedError(errArray) {
  if (errArray.length < 0) {
    return false;
  }
  const authorizedErr = errArray.find(err => err.statusCode === HTTP.UNAUTHORIZED);
  if (!authorizedErr) {
    return false;
  }
  return authorizedErr.id;
}

function addError(error) {
  return dispatch => {
    dispatch(push(error))
  }
}

function clearError() {
  return dispatch => {
    dispatch(clear());
  }
}

const push = (error) => ({type: errorActionTypes.PUSH_ERROR, error});
const remove = (id) => ({type: errorActionTypes.REMOVE_ERROR});
const clear = () => ({type: errorActionTypes.CLEAR_ERROR});
