import { HTTP } from "./statusCodes";
import { creator } from "./actions";

export const consumer = {
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
    dispatch(creator.push(error));
  }
}

function clearError() {
  return dispatch => {
    dispatch(creator.clear());
  }
}
