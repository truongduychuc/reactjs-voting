/**
 Created by Gray
 using WebStorm at
 20:37 on 23-Feb-20
 */
import React, { useEffect, useRef, useState } from "react";
import '../../sass/components/Navbar.scss';
import {
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from "../../routes";
import { usePrevious, useWindowResizeListener } from "../../hooks";

const DemoNavbar = ({sidebarCallback, wrapperRef}) => {
  const [color, setColor] = useState('transparent');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const sidebarToggle = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const foundFullScrMap = location.pathname.includes('full-screen-maps');
  const className = foundFullScrMap ? 'navbar-absolute fixed-top' : 'navbar-absolute fixed-top ' +
    (color === 'transparent' ? 'navbar-transparent' : '');

  const openSidebar = () => {
    sidebarToggle.current.classList.toggle('toggled');
    sidebarCallback();
  };
  const dropdownToggle = () => {
    setDropdownOpen(state => !state);
  };
  const toggle = () => {
    setColor(() => isOpen ? 'transparent' : 'white');
    setOpen(isOpen => !isOpen);
  };
  const previousHistory = usePrevious(history);
  const getBrand = () => {
    let name;
    routes.map(prop => {
      if (prop.collapse) {
        prop.views.map(propC => {
          if (propC.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name || null;
  };

  const {width} = useWindowResizeListener();

  useEffect(() => {
    window.onresize = () => {
      const LIMIT = 993;
      setColor(() => (width < LIMIT && isOpen) ? 'white' : 'transparent');
    };
  }, [width, isOpen]);
  useEffect(() => {
    // this is probably called right after the resize event executed
    const MEDIA_LG = 993; // large size of screen
    const isNavOpening = wrapperRef.current.className.includes('nav-open');
    if (width < MEDIA_LG && previousHistory.location.pathname !== location.pathname && isNavOpening) {
      sidebarToggle.current.classList.toggle('toggled');
      wrapperRef.current.classList.toggle('nav-open');
    }
  });
  return (
    <Navbar
      color={color}
      expand="lg"
      className={className}
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={openSidebar}
            >
              <span className="navbar-toggler-bar bar1"/>
              <span className="navbar-toggler-bar bar2"/>
              <span className="navbar-toggler-bar bar3"/>
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab"/>
          <span className="navbar-toggler-bar navbar-kebab"/>
          <span className="navbar-toggler-bar navbar-kebab"/>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={dropdownToggle}
            >
              <DropdownToggle caret nav>
                <i className="now-ui-icons users_single-02"/>
                <p>
                  <span className="d-lg-none d-md-block">User</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="a">Profile</DropdownItem>
                <DropdownItem tag="a">Log out</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};
export default DemoNavbar;
