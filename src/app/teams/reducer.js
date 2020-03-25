import { actionTypes } from "./types";
import { createReducer } from "../utils/redux";

const initialState = {
  list: [],
  options: [],
  meta: {},
  error: {},
  requestingList: false,
  requestingOptions: false
};

export const teamReducer = createReducer(initialState, {
  [actionTypes.REQUEST_TEAM_LIST] : state => {
    return {
      ...state,
      requestingList: true
    }
  },
  [actionTypes.RESOLVE_TEAM_LIST] : (state, list) => {
    return {
      ...state,
      requestingList: false,
      list
    }
  },
  [actionTypes.REQUEST_TEAM_OPTIONS]: state => {
    return {
      ...state,
      requestingOptions: true
    }
  },
  [actionTypes.RESOLVE_TEAM_OPTIONS]: (state, options) => {
    return {
      ...state,
      requestingOptions: false,
      options
    }
  },
  [actionTypes.FAILURE]: (state, error) => {
    return {
      ...state,
      requestingOptions: false,
      requestingList: false,
      error
    }
  }
});