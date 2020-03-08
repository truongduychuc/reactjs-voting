import { userActionTypes } from "./types";

const initialState = {
  requesting: false,
  users: []
};
export const users = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.REQUEST_USER_LIST:
      return {
        ...state,
        ...{
          requesting: true
        }
      };

    case userActionTypes.UPDATE_USER_LIST:
      return {
        ...state,
        ...{
          users: action.data
        }
      };
    default:
      return state;
  }
};
