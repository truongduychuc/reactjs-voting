import { errorActionTypes } from "./types";

const _push = error => ({type: errorActionTypes.PUSH_ERROR, payload: error});
const _remove = id => ({type: errorActionTypes.REMOVE_ERROR, payload: id});
const _clear = () => ({type: errorActionTypes.CLEAR_ERROR});

export const creator = {
  push: _push,
  remove: _remove,
  clear: _clear,
};
