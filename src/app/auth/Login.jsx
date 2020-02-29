/**
 Created by Gray
 using WebStorm at
 22:07 on 23-Feb-20
 */
import React, { useEffect, useState } from 'react';
import { object, string } from 'yup';
import backGroundImg from '../../assets/img/bg14.6cdd0e88.jpg';
import logoLogin from '../../assets/img/logo-login.png';
import { Field, Form, Formik } from 'formik';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import { connect } from "react-redux";
import { authActions } from "./actions";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router";


const Login = ({loggingIn, authenticated, ...props}) => {
  const [credential] = useState({
    email: '',
    password: '',
    remember: false,
    showPassword: false
  });
  const {email: initialEmail, password: initialPassword} = credential;
  const validationSchema = object().shape({
    email: string().email().required('Email is required'),
    password: string().required('Password is required')
  });
  const submitHandler = ({email, password}, {setStatus, setSubmitting, setErrors}) => {
    setStatus();
    setSubmitting(true);
    props.login(email, password);
  };

  useEffect(() => {
    if (authenticated) {
      props.logout();
    }
    // eslint-disable-next-line
  }, []);

  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [authenticated]);

  return (
    <div className="wrapper">
      <div className="full-page section-image">
        <div className="content">
          <div className="login-page">
            <Container>
              <Row>
                <Col
                  xs={12}
                  md={8}
                  lg={4}
                  className="ml-auto mr-auto"
                >
                  <Formik
                    initialValues={{email: initialEmail, password: initialPassword}}
                    onSubmit={submitHandler}
                    validationSchema={validationSchema}
                  >
                    {() => (
                      <Form>
                        <Card className="card-login card-plain">
                          <CardHeader>
                            <div className="logo-container">
                              <img alt="Logo" src={logoLogin}/>
                            </div>
                          </CardHeader>
                          <CardBody>
                            <Field name="email">
                              {({field, meta}) => (
                                <FormGroup>
                                  <InputGroup className="form-control-lg no-border">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons users_circle-08"/>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                      type="text"
                                      placeholder="Email..."
                                      {...field}
                                    />
                                  </InputGroup>
                                  {meta.touched && meta.error && (
                                    <div className="form-error">{meta.error}</div>
                                  )}
                                </FormGroup>
                              )}
                            </Field>
                            <Field name="password">
                              {({field, meta}) => (
                                <FormGroup>
                                  <InputGroup className="form-control-lg no-border">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons ui-1_lock-circle-open"/>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                      type="password"
                                      placeholder="Password..."
                                      {...field}
                                    />
                                  </InputGroup>
                                  {meta.touched && meta.error && (
                                    <div className="form-error">{meta.error}</div>
                                  )}
                                </FormGroup>
                              )}
                            </Field>
                          </CardBody>
                          <CardFooter>
                            <Button
                              color="danger"
                              block={true}
                              type="submit"
                              size="lg"
                              className="btn-round"
                            >Login
                            </Button>
                          </CardFooter>
                        </Card>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{backgroundImage: `url(${backGroundImg})`}}
        />
        <footer className="footer"/>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  loggingIn: state.authentication.loggingIn,
  authenticated: state.authentication.authenticated
});
const mapDispatchToProps = dispatch => bindActionCreators({
  login: (email, password) => authActions.login(email, password),
  logout: () => authActions.logout()
}, dispatch);
const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
export default connectedLoginPage;
