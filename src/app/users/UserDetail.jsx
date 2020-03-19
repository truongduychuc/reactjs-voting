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
  Container
} from 'reactstrap';
import { NowUiIcon } from "../components";
import { apiService } from "../../services/api";
import { useIsMountedRef } from "../../hooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Field, Form, Formik } from "formik";
import { bindActionCreators } from "redux";
import { getAuthUser, userActions } from "./actions";
import { connect } from 'react-redux';
import { apiUrls } from "../../services";

const UserDetail = ({
                      updateUser,
                      currentUser,
                      getCurrentUser,
                      userInfoLoading,
                      ...props
                    }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isEditing, setEditing] = useState(false);
  const [teamList, setTeamList] = useState([]);

  const isMountedRef = useIsMountedRef();

  const changeTab = tabKey => {
    setActiveTab(tabKey)
  };
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
    team_id
  } = user;
  const initialForm = {
    first_name: first_name ? first_name : '',
    last_name: last_name ? last_name : '',
    english_name: english_name ? english_name : '',
    phone: phone ? phone : '',
    address: address ? address : '',
    team_id: team_id != null ? team_id : ''
  };

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
    if (isMountedRef.current) {
      getTeamList();
    }

    // eslint-disable-next-line
  }, [isMountedRef]);

  useEffect(() => {
    if (!userInfoLoading) {
      getCurrentUser();
    }
  }, []);


  const getTeamList = () => {
    apiService.get(apiUrls.API.TEAMS).then(list => {
      if (isMountedRef.current) {
        setTeamList(list);
      }
    });
  };

  const submitHandler = (data, {setStatus, setSubmitting, setErrors}) => {
    setStatus();
    setSubmitting(true);
    apiService.post(apiUrls.API.UPDATE_PROFILE, data).then(success => {
      alert('Success');
      updateUser(success.data);
      backToView();
    });
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
                  {!isEditing ? (
                    <NavItem>
                      <NavLink>
                      <span onClick={editProfile}>
                        Edit
                      </span>
                      </NavLink>
                    </NavItem>
                  ) : ''}
                </Nav>
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
                    >
                      {() => (
                        <Form>
                          <Row>
                            <Col md={6}>
                              <h6 className="text-center">Basic</h6>
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
                                  </FormGroup>
                                )}
                              </Field>
                              <Field name="team_id">
                                {({field, meta}) => (
                                  <FormGroup>
                                    <Label htmlFor="team">
                                      Team
                                    </Label>
                                    <Input
                                      type="select"
                                      id="team"
                                      {...field}
                                    >
                                      {teamList.map(team => (
                                        <option
                                          defaultValue={team_id}
                                          key={`team${team.id}`}
                                          value={team.id}
                                        >
                                          {team.name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                )}
                              </Field>
                            </Col>
                            <Col md={6}>
                              <h6 className="text-center">Contact</h6>
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
                                  </FormGroup>
                                )}
                              </Field>
                            </Col>
                          </Row>
                          <div className="text-center text-md-right">
                            <Button
                              color="primary"
                              type="submit"
                              size="lg"
                              style={{fontWeight: "bold"}}
                            >
                              Save
                            </Button>
                          </div>
                        </Form>
                      )}
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
  getCurrentUser: () => userActions.getCurrentUser(),
  updateUser: (user) => dispatch(getAuthUser(user))
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

