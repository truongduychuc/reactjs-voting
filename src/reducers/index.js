import {combineReducers} from 'redux';
import {authentication} from "../app/auth";
import {errorReducer} from "../app/errors";

const rootReducer = combineReducers({
    authentication,
    errorReducer
});
export default rootReducer;
