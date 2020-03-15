import { combineReducers } from 'redux';
import { authentication } from "../app/auth";
import { errorReducer } from "../app/errors";
import { authUser } from "../app/users";

const rootReducer = combineReducers({
  authentication,
  errorReducer,
  authUser
});
export default rootReducer;
