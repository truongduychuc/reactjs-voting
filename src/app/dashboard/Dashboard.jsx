/**
 Created by Gray
 using WebStorm at
 23:10 on 23-Feb-20
 */
import React from 'react';
import PanelHeader from "../panel-header/PanelHeader";
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="lg"/>
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card>
                <CardHeader>
                  <h5 className="card-category">

                  </h5>
                </CardHeader>
                <CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default Dashboard;
