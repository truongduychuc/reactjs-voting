import { roleActionTypes } from "./types";
import { createReducer } from "../utils/redux";

const initialState = {
  requesting: false,
  requestingOptions: false,
  list: [],
  options: [],
  error: {}
};

export const roleReducer = createReducer(initialState, {
  [roleActionTypes.REQUEST_ROLE_LIST]: state => ({
    ...state,
    requesting: true
  }),
  [roleActionTypes.RESOLVE_ROLE_LIST]: (state, list) => ({
    ...state,
    requesting: false,
    list
  }),
  [roleActionTypes.REQUEST_ROLE_OPTIONS]: state => ({
    ...state,
    requestingOptions: true
  }),
  [roleActionTypes.RESOLVE_ROLE_OPTIONS]: (state, options) => ({
    ...state,
    requestingOptions: false,
    options
  }),
  [roleActionTypes.FAILURE_LIST]: (state, error) => ({
    ...state,
    requesting: false,
    error
  }),
  [roleActionTypes.FAILURE_OPTIONS]: (state, error) => ({
    ...state,
    requestingOptions: false,
    error
  })
});
