import { roleActionTypes } from "./types";

export const creator = {
  requestRoleList: () => ({type: roleActionTypes.REQUEST_ROLE_LIST}),
  requestRoleOptions: () => ({type: roleActionTypes.REQUEST_ROLE_OPTIONS}),
  resolveRoleOptions: options => ({type: roleActionTypes.RESOLVE_ROLE_OPTIONS, options}),
  resolveRoleList: list => ({type: roleActionTypes.RESOLVE_ROLE_LIST, list}),
  failure: error => ({type: roleActionTypes.FAILURE, error})
};
