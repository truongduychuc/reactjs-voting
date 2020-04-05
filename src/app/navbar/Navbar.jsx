/**
 Created by Gray
 using WebStorm at
 20:37 on 23-Feb-20
 */
import React from "react";
import {
  Button,
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { routes } from "../../routes";
import { dom } from "../../_helpers";
import { authActions } from "../auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, Form, Formik, useFormikContext } from "formik";
import { userService } from "../users/services";
import { toastr } from "../toastr";
import * as yup from 'yup';
import { FormError } from "../components";
import { errorService } from "../../services";
import cn from 'classnames';

const NavbarContext = React.createContext({});

const ChangePassword = props => {
  const {onSuccess} = props;
  const initialForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  };
  const equalTo = (ref, msg) => {
    return yup.mixed().test({
      name: 'equalTo',
      exclusive: false,
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path
      },
      test: function (value) {
        return value === this.resolve(ref);
      }
    })
  };
  yup.addMethod(yup.string, 'equalTo', equalTo);
  const validationSchema = yup.object().shape({
    current_password: yup.string()
      .required('Current password is required'),
    password: yup.string()
      .required('New password is required')
      .min(6)
      .max(255),
    password_confirmation: yup.string()
      .required('Please confirm your new password').equalTo(yup.ref('password'), 'Password confirmation must match with new password')
  });
  const submitChangePassword = (data, {setErrors, setSubmitting}) => {
    setSubmitting(true);
    userService.changePassword(data).then(success => {
      toastr.success(success.message);
      onSuccess && onSuccess();
    }).catch(error => {
      setErrors(errorService.transformValidationError(error, Object.keys(data)));
      toastr.error(error.message);
    }).finally(() => {
      setSubmitting(false);
    });
  };
  const PasswordForm = () => {
    const {submitCount, isValid, isSubmitting} = useFormikContext();
    return (
      <Form>
        <h3>Change password</h3>
        <div className={cn('password-form-wrapper', isSubmitting && 'submitting')}>
          <Field name="current_password">
            {({field, meta}) => (
              <FormGroup>
                <Input
                  type="password" {...field}
                  placeholder="Current password"
                />
                {
                  meta.touched && meta.error &&
                  <FormError>{meta.error}</FormError>
                }
              </FormGroup>
            )}
          </Field>
          <Field name="password">
            {({field, meta}) => (
              <FormGroup>
                <Input
                  type="password" {...field}
                  placeholder="New password"
                />
                {
                  meta.touched && meta.error &&
                  <FormError>{meta.error}</FormError>
                }
              </FormGroup>
            )}
          </Field>
          <Field name="password_confirmation">
            {({field, meta}) => (
              <FormGroup>
                <Input
                  type="password" {...field}
                  placeholder="Type new password again to confirm"
                />
                {
                  meta.touched && meta.error &&
                  <FormError>{meta.error}</FormError>
                }
              </FormGroup>
            )}
          </Field>
          <Button
            type="submit"
            block
            color="primary"
            disabled={submitCount >= 1 && !isValid}
          >
            Save
          </Button>
          <NavbarContext.Consumer>
            {({onCancelChangingPassword}) => (
              <Button type="button" onClick={() => {
                onCancelChangingPassword && onCancelChangingPassword();
              }} block color="link">
                Cancel
              </Button>
            )}
          </NavbarContext.Consumer>
        </div>
      </Form>
    )
  };
  return (
    <Formik
      initialValues={initialForm}
      onSubmit={submitChangePassword}
      validationSchema={validationSchema}
    >
      <PasswordForm />
    </Formik>
  );
};

class DemoNavbar extends React.Component {
  state = {
    color: 'transparent',
    isOpen: false,
    dropdownOpen: false,
    isModalOpen: false,
  };
  sidebarToggle = React.createRef();
  _isMounted = false;

  componentDidMount() {
    window.onresize = this.updateColor;
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this is probably called right after the resize event executed
    // close sidebar whenever the routing changes
    if (this._isMounted) {
      const width = dom.getWindowInnerWidth();
      const MEDIA_LG = 993; // large size of screen
      const isNavOpening = this.props.wrapperRef.current.className.includes('nav-open');
      if (width < MEDIA_LG && prevProps.location.pathname !== this.props.location.pathname && isNavOpening) {
        this.sidebarToggle.current.classList.toggle('toggled');
        this.props.wrapperRef.current.classList.toggle('nav-open');
      }

      const {authenticated, history} = this.props;
      if (!authenticated) {
        history.push('/auth/login');
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {color, isOpen, dropdownOpen} = this.state;
    const {location, logout} = this.props;
    const foundFullScrMap = location.pathname.includes('full-screen-maps');
    const className = foundFullScrMap ? 'navbar-absolute fixed-top' : 'navbar-absolute fixed-top ' +
      (this.state.color === 'transparent' ? 'navbar-transparent' : '');
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
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={this.openSidebar}
              >
                <span className="navbar-toggler-bar bar1"/>
                <span className="navbar-toggler-bar bar2"/>
                <span className="navbar-toggler-bar bar3"/>
              </button>
            </div>
            <NavbarBrand href="/">{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab"/>
            <span className="navbar-toggler-bar navbar-kebab"/>
            <span className="navbar-toggler-bar navbar-kebab"/>
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar className="justify-content-end">
            <Nav navbar>
              <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={this.dropdownToggle}
              >
                <DropdownToggle caret nav>
                  <i className="now-ui-icons users_single-02"/>
                  <p>
                    <span className="d-lg-none d-md-block">User</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/vt/user-profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem onClick={this.openModal}>
                    Change password
                  </DropdownItem>
                  <DropdownItem onClick={() => {
                    logout();
                  }}>Log out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
          <Modal
            isOpen={this.state.isModalOpen}
            centered
            toggle={this.toggleModal}
          >
            <ModalBody style={{padding: "2rem"}}>
              <NavbarContext.Provider value={{
                onCancelChangingPassword: this.onCancelChangingPassword
              }}>
                <ChangePassword onSuccess={this.closeModal}/>
              </NavbarContext.Provider>
            </ModalBody>
          </Modal>
        </Container>
      </Navbar>
    );
  }

  updateColor = () => {
    const {isOpen} = this.state;
    const width = dom.getWindowInnerWidth();
    const LIMIT = 993;
    this.setState({
      color: (width < LIMIT && isOpen) ? 'white' : 'transparent'
    });
  };
  openSidebar = () => {
    this.sidebarToggle.current.classList.toggle('toggled');
    this.props.sidebarCallback();
  };
  dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  toggle = () => {
    const {isOpen} = this.state;
    this.setState({
      color: isOpen ? 'transparent' : 'white'
    });
    this.setState({
      isOpen: !isOpen
    })
  };
  openModal = () => {
    this.setState(prev => ({
      ...prev,
      isModalOpen: true
    }));
  };
  toggleModal = () => {
    this.setState(prev => ({
      ...prev,
      isModalOpen: !prev.isModalOpen
    }));
  };
  closeModal = () => {
    this.setState(prev => ({
      ...prev,
      isModalOpen: false
    }));
  };
  onCancelChangingPassword = () => {
    this.closeModal();
  };
  getBrand = () => {
    const {location} = this.props;
    let name;
    routes.map(prop => {
      if (prop.collapse) {
        prop.views.map(propC => {
          if (propC.path === location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name || null;
  };
}

const mapStateToProps = state => ({authenticated: state.authentication.authenticated});
const mapDispatchToProps = dispatch => bindActionCreators({
  logout: () => authActions.logout()
}, dispatch);

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(DemoNavbar);

export default withRouter(connectedNavbar);
