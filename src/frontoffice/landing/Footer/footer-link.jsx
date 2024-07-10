import React from "react";
import { Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

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
              style={{ width: "40%", height: "40%" }}
              height="20"
            />
          </div>

          <p className="mb-2">
            {new Date().getFullYear()} © CNOT Perform Designed & Developed by
            ESPRIT Group
          </p>
          <p>
            It will be as simple as occidental in fact, it will be to an english
            person, it will seem like simplified English, as a skeptical
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
