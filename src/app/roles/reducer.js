import { roleActionTypes } from "./types";

const initialState = {
  requesting: false,
  requestingOptions: false,
  list: [],
  options: [],
  error: {}
};

export const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case roleActionTypes.REQUEST_ROLE_LIST:
      return {
        ...state,
        requesting: true
      };
    case roleActionTypes.RESOLVE_ROLE_LIST:
      return {
        ...state,
        requesting: false,
        list: action.list
      };
    case roleActionTypes.FAILURE:
      return {
        ...state,
        requesting: false,
        error: action.error
      };
    case roleActionTypes.REQUEST_ROLE_OPTIONS:
      return {
        ...state,
        requestingOptions: true
      };
    case roleActionTypes.RESOLVE_ROLE_OPTIONS:
      return {
        ...state,
        requestingOptions: false,
        options: action.options
      };
    default:
      return state;
  }
};
