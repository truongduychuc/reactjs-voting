import { combineReducers } from 'redux';
import { authentication } from "../app/auth";
import { appError } from "../app/errors";
import { authUser } from "../app/users";
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  authentication,
  appError,
  authUser,
  toastrReducer
});
export default rootReducer;
