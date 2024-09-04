import React from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, Col } from "reactstrap";

const Activity = (props) => {
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-start">
              <div className="me-2">
                <h5 className="card-title mb-4">Dashbord</h5>
              </div>
            </div>
            <iframe
              title="dashbord final"
              width="1120"
              height="200"
              src="https://app.powerbi.com/reportEmbed?reportId=05a17777-e186-46a3-bde4-a7dc855e47f6&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&filterPaneEnabled=false&navContentPaneEnabled=false"
              frameborder="0"
              allowFullScreen="true"
            ></iframe>
            <div className="mt-4 text-center">
              <Link to="#" className="btn btn-primary  btn-sm">
                View More <i className="mdi mdi-arrow-right ms-1"></i>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Activity;
