import { combineReducers } from 'redux';
import { authentication } from "../app/auth";
import { appError } from "../app/errors";
import { authUser } from "../app/users";
import { teamReducer } from "../app/teams";
import { roleReducer } from "../app/roles";
import { reducer as toastrReducer } from "../app/toastr";

const rootReducer = combineReducers({
  authentication,
  appError,
  authUser,
  teamReducer,
  roleReducer,
  toastr: toastrReducer
});
export default rootReducer;
