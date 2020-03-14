/**
 Created by Gray
 using WebStorm at
 21:37 on 23-Feb-20
 */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from "react-redux";

const PrivateRoute = ({component: Component, children, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      exact
      render={routeProps =>
        (authenticated)  ? (
          <Component {...routeProps}/>
        ) : (
          <Redirect
            exact
            to={{
              pathname: '/auth/login',
              state: {from: routeProps.location}
            }}
          />
        )
      }
    />
  )
};
const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
});
const connectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
export default connectedPrivateRoute;
