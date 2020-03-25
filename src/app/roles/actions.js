import { roleActionTypes } from "./types";

export const creator = {
  requestRoleList: () => ({type: roleActionTypes.REQUEST_ROLE_LIST}),
  requestRoleOptions: () => ({type: roleActionTypes.REQUEST_ROLE_OPTIONS}),
  resolveRoleOptions: payload => ({type: roleActionTypes.RESOLVE_ROLE_OPTIONS, payload}),
  resolveRoleList: payload => ({type: roleActionTypes.RESOLVE_ROLE_LIST, payload}),
  failureList: payload => ({type: roleActionTypes.FAILURE_LIST, payload}),
  failureOptions: payload => ({type: roleActionTypes.FAILURE_OPTIONS, payload})
};
