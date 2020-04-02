/**
 Created by Gray
 using WebStorm at
 21:54 on 14-Mar-20
 */
import React, { useEffect, useState } from 'react';
import PanelHeader from "../panel-header/PanelHeader";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Container,
  UncontrolledTooltip, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem
} from 'reactstrap';
import { FormError, NowUiIcon } from "../components";
import { apiService } from "../../services/api";
import { useIsMountedRef } from "../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faArrowLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { Field, Form, Formik, useFormikContext } from "formik";
import { bindActionCreators } from "redux";
import { consumer } from "./consumers";
import { connect } from 'react-redux';
import { apiUrls, errorService } from "../../services";
import { consumers as errorConsumer } from "../errors";
import { creator } from "./actions";
import * as yup from 'yup';
import { validationMessage, _general } from "../../_helpers";
import { userService } from "./services";
import { toastr } from "../toastr";
import cn from 'classnames';

const UserDetail = (props) => {
  const {
    updateUser,
    currentUser,
    getCurrentUser,
    userInfoLoading,
    pushError,
  } = props;
  const [activeTab, setActiveTab] = useState(1);
  const [isEditing, setEditing] = useState(false);
  const [genderOptions, setGenderOptions] = useState([]);
  const isMountedRef = useIsMountedRef();

  const changeTab = tabKey => {
    setActiveTab(tabKey)
  };
  const isMounted = () => !!isMountedRef.current;
  const isActive = key => key === activeTab;
  const activeClass = key => isActive(key) ? 'active' : '';
  const backToView = () => {
    setEditing(false);
  };
  const editProfile = () => {
    setEditing(true);
  };
  const user = currentUser;
  const {
    user_name,
    email,
    first_name,
    last_name,
    english_name,
    phone,
    address,
    team_name,
    role_name,
    team_id,
    gender
  } = user;
  const initialForm = {
    first_name: first_name ? first_name : '',
    last_name: last_name ? last_name : '',
    english_name: english_name ? english_name : '',
    phone: phone ? phone : '',
    address: address ? address : '',
    team_id: team_id != null ? team_id : '',
    gender
  };
  const validationSchema = yup.object().shape({
    first_name: yup.string().trim()
      // eslint-disable-next-line no-template-curly-in-string
      .max(100, validationMessage.first_name.max)
      .required(validationMessage.first_name.required),
    last_name: yup.string().trim()
      .max(100, validationMessage.last_name.max)
      .required(validationMessage.last_name.required),
    english_name: yup.string().trim()
      .max(100, validationMessage.english_name.max),
    team_id: yup.number()
      .integer()
      .positive()
      .required(validationMessage.team_id.required),
    phone: yup.string().trim()
      .max(50, validationMessage.phone.max)
      .matches(/^(\+?\d){0,50}$/, validationMessage.phone.only_number),
    address: yup.string().trim()
      .max(255, validationMessage.address.max),
    gender: yup.number()
      .integer()
  });

  const tabs = [
    {
      key: 1,
      label: 'Basic',
      icon: 'files_paper',
    },
    {
      key: 2,
      label: 'Contact',
      icon: 'shopping_credit-card',
    },
    {
      key: 3,
      label: 'Achievement',
      icon: 'sport_trophy',
    }
  ];

  useEffect(() => {
    if (!userInfoLoading) {
      getCurrentUser();
    }
    getGenders();
  }, []);

  const getGenders = () => {
    userService.getGenderOptions().then(genders => {
      if (isMounted()) {
        setGenderOptions(genders);
      }
    }).catch(error => {
      pushError(error);
    })
  };

  const submitHandler = (data, methods) => {
    const {setStatus, setSubmitting, setErrors, setValues} = methods;
    setStatus();
    setSubmitting(true);
    apiService.post(apiUrls.API.UPDATE_PROFILE, data).then(({data, message}) => {
      // call redux to update current user
      updateUser(data);
      toastr.success(message);
      setValues(initialForm);
      backToView();
    }).catch(err => {
      toastr.error(err.message);
      setErrors(errorService.transformValidationError(err, Object.keys(initialForm)));
    }).finally(() => {
      setSubmitting(false);
    });
  };
  const ProfileForm = () => {
    const {isValid, submitCount, isSubmitting} = useFormikContext();
    console.log(_general.isNotEmptyString('abc'));
    return (
      <Form className={cn('profile-form', isSubmitting && 'submitting')}>
        {
          isSubmitting && <div className="pending-screen"/>
        }
        <Row>
          <Col md={6}>
            <h6>Basic</h6>
            <div className="mb-5">
              <FormGroup>
                <Label id="emailInput">Email</Label>
                <Input disabled defaultValue={email}/>
                <UncontrolledTooltip target="emailInput">Can not change this field</UncontrolledTooltip>
              </FormGroup>
              <Field name="first_name">
                {({field, meta}) => (
                  <FormGroup>
                    <Label htmlFor="firstName">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="e.g: Van, Andre, etc."
                      {...field}
                    />
                    {meta.touched && meta.error &&
                    <FormError>{meta.error}</FormError>}
                  </FormGroup>
                )}
              </Field>
              <Field name="last_name">
                {({field, meta}) => (
                  <FormGroup>
                    <Label htmlFor="lastName">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="e.g: Huynh Thi My, Mohamed, etc."
                      {...field}
                    />
                    {meta.touched && meta.error &&
                    <FormError>{meta.error}</FormError>
                    }
                  </FormGroup>
                )}
              </Field>
              <Field name="english_name">
                {({field, meta}) => (
                  <FormGroup>
                    <Label htmlFor="english_name">
                      English name
                    </Label>
                    <Input
                      id="englishName"
                      type="text"
                      placeholder="e.g: Ella, Peter, etc."
                      {...field}
                    />
                    {meta.touched && meta.error &&
                    <FormError>{meta.error}</FormError>}
                  </FormGroup>
                )}
              </Field>
              <Field name="gender">
                {({field, meta}) => (
                  <FormGroup>
                    <Label className="mr-2" htmlFor="gender">Gender</Label>
                    <Input className="select-box-control" id="gender" type="select" {...field}>
                      {
                        genderOptions.map(({stand_for, value, disabled}) => (
                          <option key={`genderOption${value}`} disabled={disabled} value={value}>{stand_for}</option>
                        ))
                      }
                    </Input>
                    {meta.touched && meta.error &&
                    <FormError>{meta.error}</FormError>}
                  </FormGroup>
                )}
              </Field>
            </div>
          </Col>
          <Col md={6}>
            <h6>Contact</h6>
            <div className="mb-5">
              <Field name="phone">
                {({field, meta}) => (
                  <FormGroup>
                    <Label htmlFor="phone">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="e.g: 0919284xxx, +84919284xxx, etc."
                      {...field}
                    />
                    {meta.touched && meta.error &&
                    <FormError>{meta.error}</FormError>}
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
                      id="address"
                      type="text"
                      placeholder="e.g: 455 Hoang Dieu St, Da Nang."
                      {...field}
                    />
                    {meta.touched && meta.error &&
                    <FormError>{meta.error}</FormError>}
                  </FormGroup>
                )}
              </Field>
            </div>
          </Col>
        </Row>
        <div className="mt-2 text-center">
          <Button
            className="rounded-pill mb-2"
            color="danger"
            type="submit"
            size="lg"
            style={{fontWeight: "bold"}}
            disabled={!isValid && submitCount >= 1}
          >
            Save
          </Button>
        </div>
      </Form>
    )
  };
  return (
    <>
      <PanelHeader size="sm"/>
      <div className="content">
        <Container>

        </Container>
        <Row>
          <Col
            md={8}
            xl={9}
          >
            <Card className="detail-card">
              {!isEditing ? (
                <div className="nav-wrap">
                  <Nav tabs>
                    {tabs.map(tab => (
                      <NavItem key={`tab${tab.key}`}>
                        <NavLink
                          disabled={isActive(tab.key)}
                          onClick={() => changeTab(tab.key)}
                          className={activeClass(tab.key)}
                        >
                          <NowUiIcon
                            icon={tab.icon}
                            className="align-middle mr-2"
                          />
                          {tab.label}
                        </NavLink>
                      </NavItem>
                    ))}
                    {
                      !isEditing &&
                      <NavItem className="d-flex align-items-center">
                        <UncontrolledDropdown
                          direction="right"
                          className="d-block d-md-none"
                        >
                          <DropdownToggle color="link">
                            <FontAwesomeIcon icon={faEllipsisH}/>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={editProfile}>
                              Edit profile
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </NavItem>
                    }
                  </Nav>
                  {
                    !isEditing &&
                    <>
                      <Button
                        onClick={editProfile}
                        className="edit-profile-btn d-none d-md-inline-block"
                        style={{borderRadius: "30px"}}
                        color="primary"
                        size="sm"
                      >
                        <strong>Edit profile</strong>
                      </Button>
                    </>
                  }
                </div>
              ) : ''}
              <CardBody>
                {!isEditing ? (
                  <TabContent
                    activeTab={activeTab}
                  >
                    <TabPane
                      tabId={1}
                    >
                      <Row>
                        <Col xs={12}>
                          <table className="user-detail-table">
                            <tbody>
                            <tr>
                              <th>Username:</th>
                              <td>{user_name}</td>
                            </tr>
                            <tr>
                              <th>Role:</th>
                              <td style={{color: "blue"}}>{role_name}</td>
                            </tr>
                            <tr>
                              <th>First name:</th>
                              <td>{first_name}</td>
                            </tr>
                            <tr>
                              <th>Last name:</th>
                              <td>{last_name}</td>
                            </tr>
                            <tr>
                              <th>English name:</th>
                              <td>{english_name}</td>
                            </tr>
                            <tr>
                              <th>Team</th>
                              <td>{team_name}</td>
                            </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tabId={2}
                    >
                      <Row>
                        <Col xs={12}>
                          <table className="user-detail-table">
                            <tbody>
                            <tr>
                              <th>Email:</th>
                              <td>
                                <a href={`mailto:${email}`}>
                                  {email}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th>Phone:</th>
                              <td>
                                <a href={`tel:${phone}`}>
                                  {phone}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <th>Address:</th>
                              <td>
                                {address}
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane
                      tabId={3}
                    >
                      <h2>Coming soon!</h2>
                    </TabPane>
                  </TabContent>
                ) : (
                  <>
                    <CardTitle tag="h3">
                      <span
                        title="Back to view mode"
                        className="mr-4"
                        onClick={() => backToView()}
                      >
                        <FontAwesomeIcon
                          className="back-to-view"
                          icon={faArrowLeft}
                        />
                      </span>
                      Edit Profile
                    </CardTitle>
                    <Formik
                      initialValues={initialForm}
                      onSubmit={submitHandler}
                      validationSchema={validationSchema}
                    >
                      <ProfileForm/>
                    </Formik>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col
            md={4}
            xl={3}
            className={isEditing ? "d-none d-md-block" : ""}
          >
            <Card className="user-card">
              <div className="image">
              </div>
              <CardBody>
                <div className="author">
                  <div className="avatar-container">
                    <img
                      src={user.avatar_url}
                      className="avatar"
                      alt=""
                    />
                    <div className="avatar-overlay">
                      <FontAwesomeIcon
                        color="white"
                        icon={faCamera}
                      />
                    </div>
                  </div>
                  <p><small className="text-info">{user.role_name}</small></p>
                  <a href="#">
                    <h5 className="title">
                      {user.display_name}
                    </h5>
                  </a>
                  <p>{user.full_name}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const {authUser} = state;
  return {currentUser: authUser.current, userInfoLoading: authUser.requesting};
};
const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentUser: () => consumer.getCurrentUser(),
  updateUser: user => dispatch(creator.successRequest(user)),
  pushError: err => errorConsumer.add(err)
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

