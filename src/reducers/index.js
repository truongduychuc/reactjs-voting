import { combineReducers } from 'redux';
import { authentication } from "../app/auth";
import { errorReducer } from "../app/errors";
import { usersReducer } from "../app/users";

const rootReducer = combineReducers({
  authentication,
  errorReducer,
  usersReducer
});
export default rootReducer;
