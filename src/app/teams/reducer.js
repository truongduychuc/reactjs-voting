import { actionTypes } from "./types";

const initialState = {
  list: [],
  options: [],
  meta: {},
  error: {},
  requestingList: false,
  requestingOptions: false
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_TEAM_LIST:
      return {
        ...state,
        requestingList: true
      };
    case actionTypes.RESOLVE_TEAM_LIST:
      return {
        ...state,
        list: action.list,
        requestingList: false
      };
    case actionTypes.FAILURE:
      return {
        ...state,
        error: action.error,
        requestingList: false
      };
    case actionTypes.REQUEST_TEAM_OPTIONS:
      return {
        ...state,
        requestingOptions: true,
      };
    case actionTypes.RESOLVE_TEAM_OPTIONS:
      return {
        ...state,
        requestingOptions: false,
        options: action.options
      };
    default:
      return state;
  }
};