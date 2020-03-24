import { types } from "./types";
import { config } from "./config";
import { preventDuplication } from "./utils";
import { toastrCache } from "./reducer";

export const creator = {
  add: toastr => {
    if (config.preventDuplicates && preventDuplication(toastrCache, toastr)) {
      return {
        type: types.ADD_TOASTR,
        payload: {
          ignoreToastr: true
        }
      }
    }
    return {
      type: types.ADD_TOASTR,
      payload: toastr
    }
  },
  clean: () => ({type: types.CLEAN_TOASTR}),
  remove: payload => ({type: types.REMOVE_TOASTR, payload}),
  removeByType: payload => ({type: types.REMOVE_BY_TYPE, payload})
};
