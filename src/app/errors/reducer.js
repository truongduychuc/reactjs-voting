import { errorActionTypes } from "./types";
import { v4 } from 'uuid';
import { createReducer } from "../utils";

const initialState = {
  errors: []
};
export const appError = createReducer(initialState, {
  [errorActionTypes.PUSH_ERROR]: (state, error) => {
    const errors = state.errors;
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
      let newError = {
        ...error,
        id: v4()
      };
      errors.push(newError);
      return {
        ...state,
        errors
      };
    }
  },
  [errorActionTypes.REMOVE_ERROR]: (state, id) => {
    let errors = state.errors;
    if (id === undefined || String(id).trim() === '') {
      errors.shift();
    } else {
      const errorIdx = errors.findIndex(item => item.id === id);
      errorIdx !== -1 && errors.splice(errorIdx, 1);
    }
    return {
      ...state,
      errors
    }
  },
  [errorActionTypes.CLEAR_ERROR]: state => {
    return {
      ...state,
      errors: []
    }
  }
});
