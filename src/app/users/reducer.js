import { userActionTypes } from "./types";

const initialState = {
  requesting: false,
  users: [],
  meta: {
    page: 1,
    per_page: 10
  }
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.REQUEST_USER_LIST:
      return {
        ...state,
        ...{
          requesting: true
        }
      };

    case userActionTypes.SUCCESS_GET_USER_LIST:
      return {
        ...state,
        ...{
          users: action.users,
          meta: action.meta
        }
      };
    default:
      return state;
  }
};
