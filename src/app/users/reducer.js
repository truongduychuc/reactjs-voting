import { userActionTypes } from "./types";
import { createReducer } from "../utils";

const initialUser = {
  current: {
    id: '',
    first_name: '',
    last_name: '',
    english_name: '',
    full_name: '',
    display_name: '',
    team_name: ''
  },
  requesting: false,
  success: false,
  error: {}
};

export const authUser = createReducer(initialUser, {
  [userActionTypes.REQUEST_AUTH_USER]: state => ({
    ...state,
    requesting: true
  }),
  [userActionTypes.GET_AUTH_USER]: (state, user) => ({
    ...state,
    current: user,
    success: true,
    requesting: false
  }),
  [userActionTypes.ERROR_AUTH_USER]: state => initialUser
});
