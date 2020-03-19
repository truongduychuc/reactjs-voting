/**
 Created by Gray
 using WebStorm at
 20:15 on 23-Feb-20
 */
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { routes } from "../../routes";
import DemoNavbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { usePrevious } from "../../hooks";
import { bindActionCreators } from "redux";
import { userActions } from "../users";
import { connect } from 'react-redux';
import { ToastrNotification } from "../components";
import { hasUnauthorizedError } from "../errors";
import { authActions } from "../auth";

export const NotificationContext = createContext(null);


const AdminLayout = ({authenticated, getCurrentUser, rAppErrors, logout, ...props}) => {
  const mainPanelRef = useRef(null);
  const wrapperRef = useRef(null);
  const notificationRef = useRef(null);
  const [backgroundColor] = useState('blue');
  const history = useHistory();

  const catchRequestOpenSidebar = () => {
    wrapperRef.current.classList.toggle('nav-open');
  };

  const prevHistory = usePrevious(props.history);
  const notify = () => {
    const options = {
      type: "danger",
      place: "tr",
      icon: "now-ui-icons ui-1_bell-53",
      message: "Hello"
    };
    notificationRef.current.notificationAlerts(options);
  };
  useEffect(() => {
    const BEGINNING = 0;
    if (prevHistory && prevHistory.action === 'PUSH') {
      mainPanelRef.current.scrollTo({
        left: BEGINNING,
        top: BEGINNING
      });
      document.scrollingElement.scrollTo({
        left: BEGINNING,
        top: BEGINNING
      })
    }
  });

  useEffect(() => {
    getCurrentUser();
  }, [history.location.pathname, getCurrentUser]);

  useEffect(() => {
    if (!authenticated) {
      history.push('/auth/login');
    }
  });

  useEffect(() => {
    if (hasUnauthorizedError(rAppErrors)) {
      // token expires
      // unauthenticate, login again
      logout();
    }
  });
  return (
    <NotificationContext.Provider value={notify}>
      <div className="wrapper" ref={wrapperRef}>
        <Sidebar
          routes={routes}
          backgroundColor={backgroundColor}
          {...props}
        />
        <div className="main-panel" ref={mainPanelRef}>
          <DemoNavbar
            {...props}
            wrapperRef={wrapperRef}
            sidebarCallback={catchRequestOpenSidebar}
          />
          <Switch>
            {routes.map(({layout, path, component}, key) =>
              (
                <Route
                  exact
                  path={`${layout}${path}`}
                  component={component}
                  key={key}
                />
              ))}
            <Route exact path="/vt">
              <Redirect to="/vt/dashboard"/>
            </Route>
          </Switch>
          <ToastrNotification ref={notificationRef}/>
        </div>
      </div>
    </NotificationContext.Provider>
  );
};
const mapStateToProps = state => ({
  rAppErrors: state.appError.errors,
  authenticated: state.authentication.authenticated
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser: () => userActions.getCurrentUser(),
  logout: () => authActions.logout(),
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
