import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import App from "./App";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
global.axios = require('axios');
global.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const AUTH_TOKEN = store.getState().authentication.payload.access;
  if (AUTH_TOKEN) {
    config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
});

global.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
};

const AppWithStore = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

ReactDOM.render(<AppWithStore/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
