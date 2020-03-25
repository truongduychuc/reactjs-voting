import { actionTypes } from "./types";

export const creator = {
  requestTeamList: () => ({type: actionTypes.REQUEST_TEAM_LIST}),
  resolveTeamList: list => ({type: actionTypes.RESOLVE_TEAM_LIST, list}),
  failure: payload => ({type: actionTypes.FAILURE, payload}),
  requestTeamOptions: () => ({type: actionTypes.REQUEST_TEAM_OPTIONS}),
  resolveTeamOptions: payload => ({type: actionTypes.RESOLVE_TEAM_OPTIONS, payload})
};