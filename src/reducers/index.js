import { combineReducers } from 'redux';
import { authentication } from "../app/auth";
import { appError } from "../app/errors";
import { authUser } from "../app/users";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { teamReducer } from "../app/teams";
import { roleReducer } from "../app/roles";

const rootReducer = combineReducers({
  authentication,
  appError,
  authUser,
  toastrReducer,
  teamReducer,
  roleReducer
});
export default rootReducer;
