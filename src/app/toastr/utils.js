import { config } from "./config";

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
    return handle ? handle(state, payload) : state;
  }
};
const whichAnimationEvent = () => {

};
const createNewEvent = animationEnd => {

};

export const toastrWarn = message => {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  console.warn(`[toastr] ${message}`);
};

export const onCSSTransitionEnd = (node, callback) => {
  if (!node) {
    return;
  }

  // css animation failed, dispatch event manually

  const animationEnd = whichAnimationEvent();
  const timeoutId = setTimeout(() => {
    const e = createNewEvent(animationEnd);
    toastrWarn('The toastr box was closed automatically, please check \'transitionOut\' prop value');
    node.dispatchEvent(e);
  }, config.maxAnimationDelay);

  const runOnce = e => {
    clearTimeout(timeoutId);
    // not work in IE11 and Edge
    e.stopPropagation();
    node.removeEventListener(animationEnd, runOnce);
    callback && callback(e);
  };

  node.addEventListener(animationEnd, runOnce);
};
export const updateConfig = obj => {
  Object.keys(config).forEach(key => {
    if (obj.hasOwnProperty(key)) {
      config[key] = obj[key];
    }
  })
};

export const mapToToastrMessage = (type, array) => {
  const obj = {};
  obj.type = type;
  obj.position = config.position;
  obj.options = array.filter(item => typeof item === 'object')[0] || {};

  if (obj.options.hasOwnProperty('position')) {
    obj.position = obj.options.position;
  }

  if (!obj.options.hasOwnProperty('removeOnHover')) {
    obj.options.removeOnHover = true;
    if (type === 'message') {
      obj.options.removeOnHover = false;
    }
  }
};

