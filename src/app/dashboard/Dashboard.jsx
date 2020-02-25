/**
 Created by Gray
 using WebStorm at
 23:10 on 23-Feb-20
 */
import React from 'react';
import PanelHeader from "../panel-header/PanelHeader";
import { Col, Row, Card, CardHeader } from 'reactstrap';

const Dashboard = () => (
  <React.Fragment>
    <PanelHeader size="lg"/>
    <div className="content">
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <CardHeader>
              <h5 className="card-category">
                Global Sales
              </h5>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  </React.Fragment>
);
export default Dashboard;
