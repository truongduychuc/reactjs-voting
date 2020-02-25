/**
 Created by Gray
 using WebStorm at
 20:15 on 23-Feb-20
 */
import {
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { routes } from "../../routes";
import DemoNavbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const AdminLayout = (props) => {
  const mainPanelRef = useRef(null);
  const wrapperRef = useRef(null);
  const [backgroundColor] = useState('blue');


  const catchRequestOpenSidebar = () => {
    wrapperRef.current.classList.toggle('nav-open');
  };

  useEffect((prevProps) => {
    const BEGINNING = 0;
    if (prevProps.history.action === 'PUSH') {
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

  return (
    <div className="wrapper" ref={wrapperRef}>
      <Sidebar routes={routes} backgroundColor={backgroundColor} {...props} />
      <div className="main-panel" ref={mainPanelRef}>
        <DemoNavbar
          {...props}
          wrapperRef={this.wrapperRef}
          sidebarCallback={catchRequestOpenSidebar}
        />
        <Switch>
          {routes.map(({layout, path, component}, key) =>
            (
              <Route
                path={`${layout}${path}`}
                component={component}
                key={key}
              />
            ))}
          <Redirect from="admin" to="/admin/dashboard"/>
        </Switch>
      </div>
    </div>
  );
};
export default AdminLayout;
