import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

const AboutUs = () => {
  return (
    <React.Fragment>
      <section className="section hero-section" id="about">
        <div class="glow-container">
          <div class="glow-circle left"></div>
          <div class="glow-circle right"></div>
        </div>
        <Container>
          <Row className="align-items-center position-relative">
            <img
              src="/assets/images/beats.png"
              alt=""
              className="position-absolute z-n1 inset-0 object-cover"
              style={{ top: 0, left: 0 }}
            />
            <Col lg="5" className="position-relative about-us">
              <div class="about-content">
                <h2>A propos de nous</h2>
                <p>
                  CNOT Perform revolutionne l'entrainement sportif grâce à{" "}
                  <strong style={{ color: "pink" }}>
                    l'Intélligence Artificielle
                  </strong>
                </p>
                <ul>
                  <li>suivre votre performance en temps réel</li>
                  <li>
                    analyser vos données pour identifier vos points faibles et
                    forts
                  </li>
                  <li>
                    recevoir des conseils personnalisés pour éviter les
                    blessures
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg="6" className="position-relative ms-auto">
              <div className="mt-lg-0 position-relative z-1 mt-4">
                <Row>
                  <Col sm="12" className="mx-auto">
                    <div>
                      <img src="assets/images/runningman.png" alt="" />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <hr className="my-5" />
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
