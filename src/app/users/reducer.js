import { userActionTypes } from "./types";

const initialState = {
  requesting: false,
  users: [],
  meta: {
    page: 1,
    per_page: 10
  }
};

const initialUser = {
  current: {
    id: '',
    first_name: '',
    last_name: '',
    english_name: '',
    full_name: '',
    display_name: '',
    team_name: ''
  }
};

export const authUser = (state = initialUser, action) => {
  switch (action.type) {
    case userActionTypes.GET_AUTH_USER:
      return {
        ...state,
        ...{
          current: action.user
        }
      };
    default:
      return state;
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
