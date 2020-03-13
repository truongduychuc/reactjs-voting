import { userActionTypes } from "./types";


export const requestUserList = () => ({type: userActionTypes.REQUEST_USER_LIST});
export const successGetUserList = (data, meta) => ({type: userActionTypes.SUCCESS_GET_USER_LIST, users: data, meta});
