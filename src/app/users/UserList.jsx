import React, { useState } from 'react';
import { Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PanelHeader from "../panel-header/PanelHeader";
import { bindActionCreators } from "redux";
import { consumers as errorConsumer } from "../errors";
import { connect } from 'react-redux';
import { ConnectedList } from "./List";
import { ConnectedNewUser as NewUser } from "./NewUser";


const UserList = (props) => {
  const {authUser} = props;
  const [activeTab, setActiveTab] = useState(1);


  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const isActive = tab => tab === activeTab;
  const classes = tab => isActive(tab) ? "active" : null;
  const isAuthUserAdmin = () => {
    return authUser.is_admin;
  };

  return (
    <>
      <PanelHeader size="sm"/>
      <div className="content">
        <Card className="detail-card">
          <Nav tabs>
            <NavItem
            >
              <NavLink
                onClick={() => toggle(1)}
                className={classes(1)}
              >
                List
              </NavLink>
            </NavItem>
            {
              isAuthUserAdmin() ? (
                <NavItem>
                  <NavLink
                    onClick={() => toggle(2)}
                    className={classes(2)}
                  >
                    Create New
                  </NavLink>
                </NavItem>
              ) : null
            }
          </Nav>
          <CardBody>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={1}>
                <ConnectedList/>
              </TabPane>
              {
                isAuthUserAdmin() ? (
                  <TabPane tabId={2}>
                    <NewUser/>
                  </TabPane>
                ) : null
              }
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </>
  )
};

const mapStateToProps = state => ({
  authUser: state.authUser.current
});

const mapDispatchToProps = dispatch => bindActionCreators({
  pushError: err => errorConsumer.add(err)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
