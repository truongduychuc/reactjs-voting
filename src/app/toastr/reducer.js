import { createReducer } from "./utils";
import { types } from "./types";
import { guid } from "react-redux-toastr/lib/utils";
import { config } from "./config";

export let toastrCache = [];

const initialState = {
  toastrs: []
};

export const reducer  = createReducer(initialState, {
  [types.ADD_TOASTR]: (state, toastr) => {
    if (toastr.ignoreToastr) {
      return state;
    }
    const newToastr = {
      id: guid(),
      position: config.position,
      ...toastr
    };
    if (!newToastr.a11yId && toastr && toastr.hasOwnProperty('id') && !toastr.hasOwnProperty('a11yId')) {
      newToastr.a11yId = toastr.id;
    }
    let newState = state;
    if (!config.newestOnTop) {
      newState.toastrs.push(newToastr);
    } else {
      newState.toastrs.unshift(newToastr);
    }
    toastrCache = newState.toastrs;
    return newState;
  },
  [types.REMOVE_TOASTR]: (state, id) => {
    let newState = {
      ...state,
      toastrs: state.toastrs.filter(toastr => toastr.id !== id)
    };
    toastrCache = newState.toastrs;
    return newState;
  },
  [types.REMOVE_BY_TYPE]: (state, type) => {
    let newState = {
      ...state,
      toastrs: state.toastrs.filter(item => item.type !== type)
    };
    toastrCache = newState.toastrs;
    return newState;
  },
  [types.CLEAN_TOASTR] : state => {
    toastrCache = [];
    return {
      ...state,
      toastrs: []
    };
  }
});
