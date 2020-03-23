import React, { useEffect, useState } from 'react';
import { CardTitle, FormGroup, Label, Input, Row, Col, Button, UncontrolledTooltip } from 'reactstrap';
import { Formik, Form, Field } from "formik";
import { number, object, string } from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { consumers as teamConsumers } from '../teams/consumers';
import { NowUiIcon } from "../components";


const NewUser = (props) => {

  const {getTeamOptions, teamOptions} = props;

  useEffect(() => {
    getTeamOptions();
  }, []);

  const initialForm = {
    email: '',
    user_name: '',
    team_id: '',
    role_id: '',
    first_name: '',
    last_name: '',
    english_name: '',
    phone: '',
    address: ''
  };

  const validationSchema = object().shape({
    email: string().email('Email must be under format user@enclave.vn').required('Email is required'),
    user_name: string().required('User name is required'),
    first_name: string().required('First name is required'),
    last_name: string().required('Last name is required'),
    english_name: string(),
    team_id: number().positive().required('Team selection is required')
  });

  const submitHandler = (data, {}) => {

  };

  return (
    <>
      <CardTitle tag="h3" className="mb-5">
        New User
      </CardTitle>
      <div className="mb-3">
        <small className="text-danger">* field is required</small>
      </div>
      <Formik
        initialValues={initialForm}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {
          () => (
            <Form>
              <Row>
                <Col md={6}>
                  <h6>Basic</h6>
                  <div className="mb-5">
                    <Field name="email">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label className="required" htmlFor="emailAccount">
                            Email
                          </Label>
                          <Input
                            id="emailAccount"
                            type="text"
                            placeholder="user@enclave.vn, etc."
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                    <Field name="user_name">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label className="required" htmlFor="username">
                            Username
                          </Label>
                          <Input
                            type="text"
                            id="username"
                            placeholder="user01test, elena_prov, etc."
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                    <Field name="first_name">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label className="required" htmlFor="firstName">
                            First name
                          </Label>
                          <Input
                            type="text"
                            id="firstName"
                            placeholder="Peter, Marry, Van , etc."
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                    <Field name="last_name">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label className="required" htmlFor="lastName">
                            Last name
                          </Label>
                          <Input
                            type="text"
                            id="lastName"
                            placeholder="Parker, Elizabeth, Huynh Thi My, etc."
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                    <Field name="english_name">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label htmlFor="englishName">
                            English name
                            <small className="ml-2">
                              (optional: For whose last name and first name is not express in English name)
                            </small>
                          </Label>
                          <Input
                            type="text"
                            id="englishName"
                            placeholder="Ella, Pedro, etc."
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </div>
                  <h6>Workplace</h6>
                  <div className="mb-5">
                    <Field name="team_id">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label className="required mr-2">
                            Team
                          </Label>
                          <Input
                            type="select"
                            className="select-box-control"
                            {...field}
                          >
                            {
                              teamOptions.map(team => (
                                <option value={team.id} key={`teamOption${team.id}`}>{team.name}</option>
                              ))
                            }
                          </Input>
                          <Button onClick={getTeamOptions} id="teamOptionsRefresher" color="link">
                            <NowUiIcon icon="loader_refresh"/>
                          </Button>
                          <UncontrolledTooltip target="teamOptionsRefresher">
                            Refresh team options
                          </UncontrolledTooltip>
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </div>
                </Col>
                <Col md={6}>
                  <h6>Contact Information</h6>
                  <div>
                    <Field name="phone">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label htmlFor="phone">
                            Phone
                          </Label>
                          <Input
                            type="tel"
                            id="phone"
                            placeholder="+843158xxx, etc."
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                    <Field name="address">
                      {({field, meta}) => (
                        <FormGroup>
                          <Label htmlFor="address">
                            Address
                          </Label>
                          <Input
                            type="text"
                            id="address"
                            placeholder="455 Hoang Dieu St, Hai Chau Dis., Da Nang"
                            {...field}
                          />
                          {meta.touched && meta.error && (
                            <div className="form-error">{meta.error}</div>
                          )}
                        </FormGroup>
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>
              <div className="mt-2 text-center">
                <Button
                  className="rounded-pill"
                  color="danger"
                  type="submit"
                  size="lg"
                  style={{fontWeight: "bold"}}
                >
                  Create user
                </Button>
              </div>
            </Form>
          )
        }
      </Formik>
    </>
  )
};
const mapStateToProps = state => ({
  teamOptions: state.teamReducer.options,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getTeamOptions: () => teamConsumers.getTeamOptions()
}, dispatch);
const ConnectedNewUser = connect(mapStateToProps, mapDispatchToProps)(NewUser);
export {
  ConnectedNewUser
}