import React from "react";
import { Container, Row, Col } from "reactstrap";

const AboutUs = () => {
  return (
    <React.Fragment>
      <section className="section hero-section" id="about">
        <div className="glow-container">
          <div className="glow-circle left"></div>
          <div className="glow-circle right"></div>
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
  <div className="about-content">
    <h2>IA & Sport</h2>
    
    <ul>
  <li style={{ fontSize: "2.5em" }}>• Expertise</li>
  <li style={{ fontSize: "2.5em" }}>• Haute Performance</li>
  <li style={{ fontSize: "2.5em" }}>• Accompagnement Scientifique des Fédérations Sportives</li>
  <li style={{ fontSize: "2.5em" }}>• Transfert de Connaissances et de Technologies</li>
  <li style={{ fontSize: "2.5em" }}>• Estimation de la Médaillabilité</li>
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
