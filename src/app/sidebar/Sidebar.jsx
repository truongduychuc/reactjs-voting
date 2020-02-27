/**
 Created by Gray
 using WebStorm at
 21:30 on 23-Feb-20
 */
import React from 'react';
import logo from '../../assets/img/logo-white.svg';
import {NavLink, useLocation} from "react-router-dom";
import {Nav} from 'reactstrap';

const Sidebar = ({backgroundColor, routes}) => {
    const location = useLocation();
    const sidebarRef = React.useRef(null);
    const activateRoute = (routeName) => location.pathname.includes(routeName) ? 'active' : '';

    return (
        <div className="sidebar" data-color={backgroundColor}>
            <div className="logo">
                <a
                    href="https://www.creative-tim.com?ref=nudr-sidebar"
                    className="simple-text logo-mini"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="logo-img">
                        <img src={logo} alt="react-logo"/>
                    </div>
                </a>
                <a
                    className="simple-text logo-normal"
                    href="/admin/dashboard"
                >{process.env.REACT_APP_APP_BRAND}
                </a>
            </div>
            <div className="sidebar-wrapper" ref={sidebarRef}>
                <Nav>
                    {routes.map(({layout, path, redirect, icon, name}, key) => {
                        if (redirect) {
                            return null;
                        }
                        return (
                            <li key={key} className={activateRoute(`${layout}${path}`)}>
                                <NavLink
                                    to={`${layout}${path}`}
                                    className="nav-link"
                                    activeClassName="active"
                                >
                                    <i className={`now-ui-icons ${icon}`}/>
                                    <p>{name}</p>
                                </NavLink>
                            </li>
                        );
                    })}
                </Nav>
            </div>
        </div>
    );
};
export default Sidebar;
