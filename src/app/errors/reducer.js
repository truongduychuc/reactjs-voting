import { errorActionTypes } from "./types";
import { v4 } from 'uuid';

const initialState = {
  errors: []
};
export const appError = (state = initialState, action) => {
  let errors = initialState.errors;
  switch (action.type) {
    case errorActionTypes.PUSH_ERROR:
      const {response} = action.error;
      let error = {
        message: '',
        statusCode: '',
        errorCode: '',
        id: v4()
      };

      if (response) {
        const {data, status} = response;
        error.message = data.message ? data.message : '';
        error.statusCode = status;
        error.errorCode = data.error_code;
      } else {
        error.message = 'Something went wrong';
        error.statusCode = 0;
        error.errorCode = 'UNKNOWN';
      }

      const duplicatedError = errors.findIndex(err => {
        for (let key in err) {
          if (error.hasOwnProperty(key) && error[key] === err[key]) {
            // continue
          } else {
            return false;
          }
        }
        return true;
      });
      if (duplicatedError !== -1) {
        return state;
      } else {
        errors.push(error);
        return {
          ...state,
          ...{
            errors
          }
        };
      }
    case errorActionTypes.REMOVE_ERROR:
      errors.shift();
      return {
        ...state,
        ...{
          errors
        }
      };
    case errorActionTypes.CLEAR_ERROR:
      return {
        errors: []
      };
    default:
      return state;
  }
};
