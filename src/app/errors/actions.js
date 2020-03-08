import { errorActionTypes } from "./types";

export const pushError = (error) => ({type: errorActionTypes.PUSH_ERROR, error});
export const removeError = () => ({type: errorActionTypes.REMOVE_ERROR});
