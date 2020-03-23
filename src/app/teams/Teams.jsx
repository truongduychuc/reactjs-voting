import PanelHeader from "../panel-header/PanelHeader";
import React from 'react';
import { Card, CardBody } from 'reactstrap';

const Teams = () => {
  return (
    <>
      <PanelHeader size="sm"/>
      <div className="content">
        <Card>
          <CardBody>
            Teams
          </CardBody>
        </Card>
      </div>
    </>
  )
};
export {
  Teams
}