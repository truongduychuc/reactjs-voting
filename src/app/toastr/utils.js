export const preventDuplication = (currentData = [], newObj) => {
  let hasDuplication = false;
  if (!currentData || currentData.length < 1) {
    return hasDuplication;
  }
  if (currentData.length === 1) {
    return isSameToastr(currentData[0], newObj);
  }
  for (const item of currentData) {
    if (item.options && !item.options.preventDuplicates) {
      break;
    }
    if (isSameToastr(item, newObj)) {
      hasDuplication = true;
      break;
    }
  }
  return hasDuplication;
};
const isSameToastr = (prev, next) => {
  const props = new Set(['title', 'message', 'type']);
  let same = true;
  for (const prop of props) {
    if (prev.hasOwnProperty(prop) && next.hasOwnProperty(prop)) {
      if (prev[prop] !== next[prop]) {
        same = false;
        break;
      }
    } else if ((prev.hasOwnProperty(prop) && !next.hasOwnProperty(prop)) || (!prev.hasOwnProperty(prop) && next.hasOwnProperty(prop))) {
      same = false;
      break;
    }
  }  
  return same;
};

export const createReducer = (initialState, fnMap) => {
  return (state = initialState, {type, payload}) => {
    const handle = fnMap[type];
    return handle ? handle(state, payload) : false;
  }
};
