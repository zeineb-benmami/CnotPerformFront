import React from "react";
import { Row, Col } from "reactstrap";

//Import Images

import logo from "../../../../public/assets/images/logo/CNOT_icon.png";

const FooterLink = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="6">
          <div className="mb-4">
            <img
              src={logo}
              alt=""
              style={{ width: "50%", height: "50%" }}
              height="20"
            />
          </div>

          <p className="mb-2">
            {new Date().getFullYear()} © Skote. Design & Develop by Themesbrand
          </p>
          <p>
            It will be as simple as occidental in fact, it will be to an english
            person, it will seem like simplified English, as a skeptical
          </p>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FooterLink;
