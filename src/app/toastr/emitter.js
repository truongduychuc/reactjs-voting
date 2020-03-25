import EventEmitter from "eventemitter3";

const emitter = new EventEmitter();
const addToToastr = (type, array) => emitter.emit('add/toastr', mapToToastrMessage(type, array));