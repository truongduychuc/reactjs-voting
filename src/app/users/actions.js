import { userActionTypes } from "./types";

const requestAuthUser = () => ({type: userActionTypes.REQUEST_AUTH_USER});
const getAuthUser = user => ({type: userActionTypes.GET_AUTH_USER, payload: user});
const failure = () => ({type: userActionTypes.ERROR_AUTH_USER});

export const creator = {
  request: requestAuthUser,
  successRequest: getAuthUser,
  failed: failure
};
