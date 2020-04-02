import React, { useEffect, useState } from 'react';
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
import { toastr } from "../toastr";
import cn from 'classnames';
import { errorService } from "../../services";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validationMessage } from "../../_helpers";


const NewUser = (props) => {

    const {
      getTeamOptions,
      teamOptions,
      getRoleOptions,
      roleOptions,
      pushError
    } = props;
    const [viewMode, setViewMode] = useState(false);
    const [createdUser, setCreatedUser] = useState({});


    useEffect(() => {
      getTeamOptions();
      getRoleOptions();
    }, [getRoleOptions, getTeamOptions]);

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
        .max(50, validationMessage.email.max)
        .email(validationMessage.email.email)
        .matches(/^[a-zA-Z]./, validationMessage.email.not_number)
        .required(validationMessage.email.required),
      user_name: string().trim()
        .max(50, validationMessage.user_name.max)
        .matches(/^\S*$/g, validationMessage.user_name.exclude_whitespace)
        .required(validationMessage.user_name.required),
      first_name: string().trim()
        // eslint-disable-next-line no-template-curly-in-string
        .max(100, validationMessage.first_name.max)
        .required(validationMessage.first_name.required),
      last_name: string().trim()
        .max(100, validationMessage.last_name.max)
        .required(validationMessage.last_name.required),
      english_name: string().trim()
        .max(100, validationMessage.english_name.max),
      team_id: number()
        .integer()
        .positive()
        .required(validationMessage.team_id.required),
      phone: string().trim()
        .max(50, validationMessage.phone.max)
        .matches(/^\d{0,50}$/, validationMessage.phone.only_number),
      address: string().trim()
        .max(255, validationMessage.address.max),
      role_id: number()
        .integer()
        .required(validationMessage.role_id.required)
        .positive()
    });

    const submitHandler = (data, {setValues, setSubmitting, setErrors}) => {
      setSubmitting(true);
      userService.createNew(data).then(success => {
        toastr.success('Created user successfully.');
        setCreatedUser(success.data);
        setViewMode(true);
        setValues(initialForm);
      }).catch(err => {
        setErrors(errorService.transformValidationError(err, Object.keys(initialForm)));
        err.message && toastr.error(err.message);
        pushError(err);
      }).finally(() => {
        setSubmitting(false);
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
      const {values, isValid, isSubmitting, submitCount} = useFormikContext();

      return (
        <Form className="new-user-form">
          <div className={cn('wrap', isSubmitting && 'submitting')}>
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
                            teamOptions ?
                              teamOptions.map(team => (
                                <option
                                  value={team.id}
                                  key={`teamOption${team.id}`}>
                                  {team.name}
                                </option>
                              )) : null
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
              <UncontrolledTooltip target="submitUserBtn">
                Click to submit and create
              </UncontrolledTooltip>
              <Button
                className="rounded-pill"
                color="danger"
                type="submit"
                size="lg"
                style={{fontWeight: "bold"}}
                disabled={!isValid && submitCount >= 1}
                id="submitUserBtn"
              >
                Create user
              </Button>
            </div>
          </div>
        </Form>
      );
    };

    const CreatedUser = props => {
      const {
        user_name,
        email,
        first_name,
        last_name,
        english_name,
        phone,
        address,
        role_name,
        team_name
      } = props;

      return (
        <div className="created-detail">
          <h6>
            <span className="mr-2">Detail</span>
            <FontAwesomeIcon icon={faAngleDoubleRight}/>
          </h6>
          {
            <Row>
              <Col md={6}>
                <Row className="mb-2">
                  <Col md={6}>
                    <strong>Email:</strong>
                  </Col>
                  <Col md={6}>
                    <p>
                      {email}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <strong>Username:</strong>
                  </Col>
                  <Col md={6}>
                    <p>
                      {user_name}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <strong>First name:</strong>
                  </Col>
                  <Col md={6}>
                    <p>
                      {first_name}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}>
                    <strong>Last name:</strong>
                  </Col>
                  <Col md={6}>
                    <p>
                      {last_name}
                    </p>
                  </Col>
                </Row>
                {
                  english_name &&
                  <Row className="mb-2">
                    <Col md={6}>
                      <strong>English name:</strong>
                    </Col>
                    <Col md={6}>
                      <p>{english_name}</p>
                    </Col>
                  </Row>
                }
                {
                  phone &&
                  <Row className="mb-2">
                    <Col md={6}>
                      <strong>Phone:</strong>
                    </Col>
                    <Col md={6}>
                      <p>{phone}</p>
                    </Col>
                  </Row>
                }
                {
                  address &&
                  <Row className="mb-2">
                    <Col md={6}>
                      <strong>Address:</strong>
                    </Col>
                    <Col md={6}>
                      <p>{address}</p>
                    </Col>
                  </Row>
                }
                {
                  role_name &&
                  <Row className="mb-2">
                    <Col md={6}>
                      <strong>Role:</strong>
                    </Col>
                    <Col md={6}>
                      <p>{role_name}</p>
                    </Col>
                  </Row>
                }
                {
                  team_name &&
                  <Row className="mb-2">
                    <Col md={6}>
                      <strong>Team:</strong>
                    </Col>
                    <Col md={6}>
                      <p>{team_name}</p>
                    </Col>
                  </Row>
                }
              </Col>
            </Row>
          }
        </div>
      )
    };

    return (
      <>
        <CardTitle tag="h3" className="mb-5">
          {viewMode && createdUser ? 'Created user successfully' : 'New User'}
        </CardTitle>
        {
          !viewMode &&
          <div className="mb-3">
            <small className="text-danger">* field is required</small>
          </div>
        }
        <Formik
          initialValues={initialForm}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {
            !viewMode ? <UserForm/> : createdUser && <CreatedUser {...createdUser} />
          }
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
