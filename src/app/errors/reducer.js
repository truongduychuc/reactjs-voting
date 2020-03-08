import { errorActionTypes } from "./types";

const initialState = {
  errors: []
};
export const errorReducer = (state = initialState, action) => {
  let errors = initialState.errors;
  switch (action.type) {
    case errorActionTypes.PUSH_ERROR:
      errors.push(action.error);
      return {
        ...state,
        ...{
          errors
        }
      };
    case errorActionTypes.REMOVE_ERROR:
      errors.shift();
      return {
        ...state,
        ...{
          errors
        }
      };
    default:
      return state;
  }
};
