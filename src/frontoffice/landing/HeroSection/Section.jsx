import React from "react";
import { Container, Row, Col } from "reactstrap";

const Section = () => {
  return (
    <React.Fragment>
      <section className="section hero-section" id="home">
        <div class="glow-container">
          <div class="glow-circle left"></div>
          <div class="glow-circle right"></div>
        </div>
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <h4
                className=" text-teal-500"
                style={{ color: "cyan", fontStyle: "italic" }}
              >
                Votre chemin vers le succés
              </h4>
              <hr />
              <div className="text-white-50">
                <h1 className="fw-semibold hero-title mb-3 text-white">
                  Bienvenu à
                </h1>
                <h1 className="fw-semibold hero-title mb-3 text-white">
                  CNOT Perform
                </h1>
              </div>
              <div>
                <a href="#about" className="cta-button mt-5">
                  {" "}
                  Démarrer
                </a>
              </div>
            </Col>
            <Col lg="6" md="8" sm="10" className="ms-lg-auto">
              <img src="assets/images/fares.jpg" alt="" className=" hero-img" />
            </Col>
          </Row>
        </Container>
      </section>
      <section class="stats-section">
        <div class="stats-card">
          <h2>2,500</h2>
          <p>Total Athletes</p>
        </div>
        <div class="stats-card">
          <h2>300</h2>
          <p>Total Coaches</p>
        </div>
        <div class="stats-card">
          <h2>150</h2>
          <p>Total Trainers</p>
        </div>
        <div class="stats-card">
          <h2>10,000</h2>
          <p>Active Sessions</p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Section;
