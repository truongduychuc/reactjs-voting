/**
 Created by Gray
 using WebStorm at
 20:15 on 23-Feb-20
 */
import { Redirect, Route, Switch } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { routes } from "../../routes";
import DemoNavbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { usePrevious } from "../../hooks";
import { bindActionCreators } from "redux";
import { userActions } from "../users";
import { connect } from 'react-redux';

const AdminLayout = ({getCurrentUser, authUserError, ...props}) => {
  const mainPanelRef = useRef(null);
  const wrapperRef = useRef(null);
  const [backgroundColor] = useState('blue');


  const catchRequestOpenSidebar = () => {
    wrapperRef.current.classList.toggle('nav-open');
  };
  const prevHistory = usePrevious(props.history);
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
  }, [prevHistory]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {

  }, [authUserError]);

  return (
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
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  authUserError: state.authUser.error
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser: () => userActions.getCurrentUser()
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
