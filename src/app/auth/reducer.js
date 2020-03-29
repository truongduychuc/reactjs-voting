import { authActionTypes } from "./types";
import { Ls } from "../../_helpers";
import { createReducer } from "../utils";

const initialPayload = {
  access: !!Ls.get('auth.access') ? Ls.get('auth.access') : '',
  refresh: !!Ls.get('auth.refresh') ? Ls.get('auth.refresh') : '',
  expiresIn: !!Ls.get('auth.expires_in') ? Number(Ls.get('auth.expires_in')) : 0
};
const initialState = {
  authenticated: !!Ls.get('auth.access'),
  payload: initialPayload,
  loggingIn: false
};
const emptyState = {
  authenticated: false,
  payload: {
    access: '',
    refresh: '',
    expiresIn: ''
  },
  loggingIn: false
};

export const authentication = createReducer(initialState, {
  [authActionTypes.LOGIN_REQUEST]: state => ({
    ...state,
    loggingIn: true
  }),
  [authActionTypes.LOGIN_SUCCESS]: (state, payload) => ({
    ...state,
    authenticated: true,
    payload,
    loggingIn: false
  }),
  [authActionTypes.LOGIN_FAILURE]: (state, res) => {
    const {response } = res;
    let error = {};
    if (response) {
      const {data, status} = response;
      error = {
        message: data.message,
        statusCode: status
      }
    }
    return {
      ...state,
      authenticated: false,
      error,
      loggingIn: false
    }
  },
  [authActionTypes.LOG_OUT]: state => emptyState
});
