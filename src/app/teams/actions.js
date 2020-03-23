import { actionTypes } from "./types";

export const creator = {
  requestTeamList: () => ({type: actionTypes.REQUEST_TEAM_LIST}),
  resolveTeamList: list => ({type: actionTypes.RESOLVE_TEAM_LIST, list}),
  failure: error => ({type: actionTypes.FAILURE, error}),
  requestTeamOptions: () => ({type: actionTypes.REQUEST_TEAM_OPTIONS}),
  resolveTeamOptions: options => ({type: actionTypes.RESOLVE_TEAM_OPTIONS, options})
};