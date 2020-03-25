import { creator } from "./actions";
import { roleService } from "./services";

export const consumers = {
  getRoleOptions() {
    return dispatch => {
      dispatch(creator.requestRoleOptions());
      return roleService.getRoleOptions().then(options => {
        dispatch(creator.resolveRoleOptions(options));
      }).catch(error => {
        dispatch(creator.failureOptions(error));
      })
    }
  }
};
