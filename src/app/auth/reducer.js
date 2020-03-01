import { authActionTypes } from "./types";
import { Ls } from "../../_helpers";

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

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN_REQUEST:
      return {
        ...state, ...{
          loggingIn: true
        }
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state, ...{
          authenticated: true,
          payload: action.payload
        }
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        ...{
          authenticated: false,
          error: action.error
        }
      };
    case authActionTypes.LOG_OUT:
      return emptyState;
    default:
      return state;
  }
};
