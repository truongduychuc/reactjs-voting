import { service } from "./services";
import { creator } from "./actions";

export const consumers = {
  getTeamOptions() {
    return dispatch => {
      dispatch(creator.requestTeamOptions());
      return service.getTeamList().then(option => {
        dispatch(creator.resolveTeamOptions(option));
      }).catch(err => {
        dispatch(creator.failure(err));
      })
    }
  }
};

