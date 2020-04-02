import EventEmitter from "eventemitter3";
import { mapToToastrMessage } from "./utils";
import { toastrType } from "./types";

const emitter = new EventEmitter();
const addToToastr = (type, array) => emitter.emit('add/toastr', mapToToastrMessage(type, array));
let actions = {};

const mapToastrTypesToActions = () => {
  let obj = {};
  const actionTypes = Object.keys(toastrType);
  if (actionTypes.length === 0) {
    console.warn('There is no toastr type found in the collection, inspect the toastr type to check again!');
  }
  actionTypes.forEach(key => {
   obj[toastrType[key]] = (...args) => addToToastr(toastrType[key], args);
  });
  return obj;
};


actions = mapToastrTypesToActions();
actions.clean = () => emitter.emit('clean/toastr');


actions.removeByType = type => emitter.emit('removeByTypes/toastr', type);
actions.remove = id => emitter.emit('remove/toastr', id);
actions.confirm = (...args) => {
  emitter.emit('toastr/confirm', {
    message: args[0],
    options: args[1] || {}
  })
};
export const EE = emitter;
export const toastrEmitter = actions;
