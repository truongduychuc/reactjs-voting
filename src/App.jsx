/**
 Created by Gray
 using WebStorm at
 21:47 on 23-Feb-20
 */
import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./routes/NotFound";
import AdminLayout from './app/layouts/Admin';
import { connect, Provider } from "react-redux";
import { store } from './store';
import { ReduxToastr } from "./app/toastr";
import LoginPage from "./app/auth/NewLogin";

const history = createBrowserHistory();

const App = () => (
  <>
    <Router history={history}>
      <Switch>
        <PrivateRoute
          path="/vt"
          component={AdminLayout}
        />
        <Route
          path="/auth/login"
          component={LoginPage}
        />
        <Route exact path="/">
          <Redirect to="/vt"/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Router>
    <ReduxToastr/>
  </>
);

const ReduxConnectedApp = connect()(App);

const AppWithStore = () => (
  <Provider store={store}>
    <ReduxConnectedApp/>
  </Provider>
);
export default AppWithStore;

