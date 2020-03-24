import React, { useEffect } from 'react';
import { Button, CardTitle, Col, FormGroup, Input, Label, Row, UncontrolledTooltip } from 'reactstrap';
import { Field, Form, Formik, useFormikContext } from "formik";
import { number, object, string } from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { consumers as teamConsumers } from '../teams';
import { consumers as errorConsumers } from '../errors';
import { consumers as roleConsumers } from '../roles'
import { NowUiIcon } from "../components";
import { userService } from "./services";


const NewUser = (props) => {

    const {
      getTeamOptions,
      teamOptions,
      getRoleOptions,
      roleOptions,
      pushError
    } = props;


    useEffect(() => {
      getTeamOptions();
      getRoleOptions();
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
      email: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(50, 'Email is only long ${max} characters at maximum')
        .email('Email must be under format user@example.net')
        .matches(/^[a-zA-Z]./, 'Email can not start with number')
        .required('Email is required'),
      user_name: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(50, 'User name is only long ${max} characters at maximum')
        .required('User name is required'),
      first_name: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(100, 'First name is only long ${max} characters at maximum')
        .required('First name is required'),
      last_name: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(100, 'Last name is only long ${max} characters at maximum')
        .required('Last name is required'),
      english_name: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(100, 'English name is only long ${max} characters at maximum'),
      team_id: number()
        .integer()
        .positive()
        .required('Team selection is required'),
      phone: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(50, 'Phone number is only long ${max} characters at maximum')
        .matches(/^\d{0,50}$/, 'Phone number can only contain the numbers'),
      address: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(255, 'Address is only long ${max} characters at maximum'),
      role_id: number()
        .integer()
        .required('Role selection is required')
        .positive()
    });

    const submitHandler = (data, {setStatus, setSubmitting, setErrors}) => {
      setSubmitting(true);
      userService.createNew(data).then(success => {
        window.alert('Success');
      }).catch(err => {
        pushError(err);
      })
    };

    const PreviewDisplayedName = props => {
      const {first_name, last_name, english_name} = props;
      return (
        (first_name || last_name || english_name) ?
          (
            <FormGroup>
              <Label className="text-primary">
                The full name will be displayed like
              </Label>
              <h5 className="text-primary">
                {userService.getDisplayedName(first_name, last_name, english_name)}
              </h5>
            </FormGroup>
          ) : null
      );
    };
    PreviewDisplayedName.defaultProps = {
      values: {
        first_name: '',
        last_name: '',
        english_name: ''
      }
    };

    const UserForm = () => {
      const {values} = useFormikContext();
      return (
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
                        placeholder="user@example.org, etc."
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
                      <Label className="required mr-2" htmlFor="lastName">
                        Last name
                        <small>(May have surname followed after)</small>
                      </Label>
                      <Input
                        type="text"
                        id="lastName"
                        placeholder="Parker Steven, Elizabeth, Huynh Thi My, etc."
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
                <PreviewDisplayedName {...values}/>
              </div>
            </Col>
            <Col md={6}>
              <h6>Contact Information</h6>
              <div className="mb-5">
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
                        tag="textarea"
                        rows={4}
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
                        <option value="" disabled>Choose a team</option>
                        {
                          teamOptions.map(team => (
                            <option
                              value={team.id}
                              key={`teamOption${team.id}`}>
                              {team.name}
                            </option>
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
                <Field name="role_id">
                  {({field, meta}) => (
                    <FormGroup>
                      <Label className="required mr-2">
                        Role
                      </Label>
                      <Input
                        type="select"
                        className="select-box-control"
                        {...field}
                      >
                        <option value="" disabled>Choose a role</option>
                        {
                          roleOptions.map(role => (
                            <option
                              value={role._k}
                              key={`roleOption${role._k}`}>
                              {role._l}
                            </option>
                          ))
                        }
                      </Input>
                      <Button onClick={getRoleOptions} id="roleOptionsRefresher" color="link">
                        <NowUiIcon icon="loader_refresh"/>
                      </Button>
                      <UncontrolledTooltip target="roleOptionsRefresher">
                        Refresh role options
                      </UncontrolledTooltip>
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
      );
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
          <UserForm/>
        </Formik>
      </>
    )
  }
;
const mapStateToProps = state => ({
  teamOptions: state.teamReducer.options,
  roleOptions: state.roleReducer.options,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getTeamOptions: () => teamConsumers.getTeamOptions(),
  getRoleOptions: () => roleConsumers.getRoleOptions(),
  pushError: (err) => errorConsumers.add(err)
}, dispatch);
const ConnectedNewUser = connect(mapStateToProps, mapDispatchToProps)(NewUser);
export {
  ConnectedNewUser
}
