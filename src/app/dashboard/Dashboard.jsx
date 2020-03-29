/**
 Created by Gray
 using WebStorm at
 23:10 on 23-Feb-20
 */
import React from 'react';
import PanelHeader from "../panel-header/PanelHeader";
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { toastr } from "../toastr";

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
                    Global Sales
                  </h5>
                </CardHeader>
                <CardBody>
                  <Button onClick={() => toastr.success('Success', 'Welcome, Chuc (Gray) D. TRUONG')}>
                    Hello
                  </Button>
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
