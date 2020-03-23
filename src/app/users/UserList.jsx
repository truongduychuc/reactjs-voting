import React, { useState } from 'react';
import { Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PanelHeader from "../panel-header/PanelHeader";
import { bindActionCreators } from "redux";
import { consumer as errorConsumer } from "../errors";
import { connect } from 'react-redux';
import { ConnectedList } from "./List";
import { ConnectedNewUser as NewUser } from "./NewUser";


const UserList = ({pushError}) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  };
  const isActive = tab => tab === activeTab;
  const classes = tab => isActive(tab) ? "active" : null;

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
            <NavItem>
              <NavLink
                onClick={() => toggle(2)}
                className={classes(2)}
              >
                Create New
              </NavLink>
            </NavItem>
          </Nav>
          <CardBody>
            <TabContent activeTab={activeTab}>
              <TabPane tabId={1}>
                <ConnectedList/>
              </TabPane>
              <TabPane tabId={2}>
                <NewUser/>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    </>
  )
};


const mapDispatchToProps = dispatch => bindActionCreators({
  pushError: err => errorConsumer.add(err)
}, dispatch);

export default connect(null, mapDispatchToProps)(UserList);
