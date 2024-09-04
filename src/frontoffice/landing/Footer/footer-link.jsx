import React from "react";
import { Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

const FooterLink = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="6">
          <Row className="mb-4">
            <img
              src="/public/assets/images/logo/CNOT_icon.png"
              alt=""
              style={{ width: "200px", height: "200px", borderRadius: "10px" }}
            />
            <img
              src="/public/assets/images/logo/sli.png"
              alt=""
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            />
          </Row>

          <p className="mb-2">
            {new Date().getFullYear()} © CNOT Perform Designed & Developed by
            ESPRIT Group
          </p>
        </Col>
        <Col lg="2"></Col>
        <Col lg="4">
          <div className="mb-lg-0 mb-4">
            <h5 className="footer-list-title mb-3">Contact</h5>
            <div className="blog-post">
              <Link to="#" className="post">
                <div className="badge badge-soft-success font-size-11 mb-3">
                  Adresse
                </div>
                <h5 className="post-title">
                  Centre Culturel et Sportif de la Jeunesse El Menzah 6 -2091
                  Tunis
                </h5>
              </Link>
              <Link to="#" className="post">
                <div className="badge badge-soft-success font-size-11 mb-3">
                  Tél
                </div>
                <h5 className="post-title">+(216) 71 767 681</h5>
              </Link>

              <Link to="#" className="post">
                <div className="badge badge-soft-success font-size-11 mb-3">
                  Fax
                </div>
                <h5 className="post-title">+(216) 71 767 289</h5>
              </Link>
              <Link to="#" className="post">
                <div className="badge badge-soft-success font-size-11 mb-3">
                  E-mail
                </div>
                <h5 className="post-title">president.cnot@email.ati.tn</h5>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FooterLink;
