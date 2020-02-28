/**
 Created by Gray
 using WebStorm at
 21:37 on 23-Feb-20
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { store } from "../store";

const PrivateRoute = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    exact
    render={routeProps =>
      store.getState().authentication.authenticated ? (
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
// const mapStateToProps = state => ({authenticated: state.authentication.authenticated});
export default PrivateRoute;
