/**
 Created by Gray
 using WebStorm at
 21:37 on 23-Feb-20
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Ls from "../_helpers/ls";

const PrivateRoute = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    exact
    render={routeProps =>
      Ls.get('auth.access') ? (
        <Component {...routeProps}/>
      ) : (
        <Redirect
          to={{
            pathname: '/auth/login',
            state: {from: routeProps.location}
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
