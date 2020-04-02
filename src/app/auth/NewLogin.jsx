import { useHistory } from "react-router";
import React, { useEffect } from 'react';
import { string, object } from "yup";
import { Field, Form, Formik, useFormikContext } from "formik";
import { bindActionCreators } from "redux";
import { authActions } from "./actions";
import { consumers as errorConsumer } from "../errors";
import { connect } from "react-redux";
import cn from 'classnames';
import { NowUiIcon } from "../components";

const LoadingBackDrop = (props) => {
  const {loading} = props;
  return (
    loading ? (
      <div className="loading-backdrop">
        <div className="loading-box">
          <img alt="Loading" src="/assets/img/loading_icon.svg"/>
        </div>
      </div>
    ) : null
  )
};
const isEmpty = val => {
  if (val === '') {
    return true;
  }
  if (val == null) {
    return true;
  }
  return false;
};
const LoginForm = () => {
  const {values} = useFormikContext();
  return (
    <Form className="login-form">
      <span className="login-form-title">
        Login
      </span>
      <Field name="email">
        {({field, meta}) => (
          <div className="wrap-input validate-input alert-validate mb-23">
            {meta.touched && meta.error && (
              <>
                <NowUiIcon icon="travel_info" className="validate-icon"/>
                <span className="validate">
                {meta.error}
                </span>
              </>
            )}
            <span className="label-input">Username</span>
            <input
              type="text"
              className={cn('input', !isEmpty(values.email) ? 'has-val' : '')}
              placeholder="Enter email"
              {...field}
            />
            <span className="focus-input email-input"/>
          </div>
        )}
      </Field>
      <Field name="password">
        {({field, meta}) => (
          <div className="wrap-input validate-input alert-validate" data-validate={meta.error}>
            {meta.touched && meta.error && (
              <>
                <NowUiIcon icon="travel_info" className="validate-icon"/>
                <span className="validate">
                {meta.error}
                </span>
              </>
            )}
            <span className="label-input">Password</span>
            <input
              type="password"
              className={cn('input', !isEmpty(values.password) ? 'has-val' : '')}
              placeholder="Enter password"
              {...field}
            />
            <span className="focus-input pw"/>
          </div>
        )}
      </Field>
      <div className="helps-area">
        <span className="forgot-pw">
          Forgot password?
        </span>
      </div>
      <div className="container-form-btn">
        <div className="wrap-login-btn">
          <div className="login-bgbtn">
          </div>
          <button className="login-submit-btn" type="submit">
            Login
          </button>
        </div>
      </div>
    </Form>
  )
};
const Login = props => {
  const {
    loggingIn,
    authenticated,
    login,
    clearErrors,
    logout
  } = props;
  const initialCredential = {
    email: '',
    password: '',
    remember: false,
    showPassword: false
  };
  const history = useHistory();

  const validationSchema = object().shape({
    email: string().trim().email().required('Email is required'),
    password: string().trim().required('Password is required')
  });
  const submitHandler = ({email, password}, {setStatus, setSubmitting, setErrors}) => {
    setStatus();
    setSubmitting(true);
    login(email, password);
  };
  useEffect(() => {
    if (authenticated) {
      logout();
    }
    clearErrors();
    // eslint-disable-next-line
    return () => clearErrors();
  }, []);
  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated]);

  return (
    <div className="wrapper">
      <div className="container-w100">
        <div className="login-box">
          <LoadingBackDrop loading={loggingIn}/>
          <Formik
            initialValues={initialCredential}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
          >
            <LoginForm/>
          </Formik>
        </div>
      </div>
    </div>
  )
};
const mapStateToProps = state => ({
  loggingIn: state.authentication.loggingIn,
  authenticated: state.authentication.authenticated
});
const mapDispatchToProps = dispatch => bindActionCreators({
  login: (email, password) => authActions.login(email, password),
  logout: () => authActions.logout(),
  clearErrors: () => errorConsumer.clear()
}, dispatch);
const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginPage;
