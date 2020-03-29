import EventEmitter from "eventemitter3";
import { mapToToastrMessage } from "./utils";

const emitter = new EventEmitter();
const addToToastr = (type, array) => emitter.emit('add/toastr', mapToToastrMessage(type, array));
let actions = {};
['primary', 'light', 'message', 'info', 'success', 'warning', 'error'].forEach(item => {
  actions[item] = (...args) => addToToastr(item, args);
});
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
