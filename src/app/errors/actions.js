import { errorActionTypes } from "./types";

const _push = (error) => ({type: errorActionTypes.PUSH_ERROR, error});
const _remove = (id) => ({type: errorActionTypes.REMOVE_ERROR});
const _clear = () => ({type: errorActionTypes.CLEAR_ERROR});

export const creator = {
  push: _push,
  remove: _remove,
  clear: _clear,
};
