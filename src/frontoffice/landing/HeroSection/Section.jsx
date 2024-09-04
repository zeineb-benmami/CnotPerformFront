import React from "react";
import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";

const Section = () => {
  return (
    <React.Fragment>
      <section className="section hero-section" id="home">
        <div className="glow-container">
          <div className="glow-circle left"></div>
          <div className="glow-circle right"></div>
        </div>
        <Container>
          <Row className="align-items-center">
            <Col lg="6" md="4">
              <h4
                className=" text-teal-500"
                style={{ color: "cyan", fontStyle: "italic" }}
              >
                Votre chemin vers le succés
              </h4>
              <hr />
              <div className="text-white-50">
                <h1 className="fw-semibold hero-title mb-3 text-white">
                  CNOT Perform
                </h1>
              </div>
              <div style={{ marginTop: "10%" }}>
                <a href="#about" className="cta-button mt-5">
                  {" "}
                  Commencer
                </a>
              </div>
            </Col>
            <Col lg="6" md="8" sm="12" className="ms-lg-auto">
              <div className=" hero-img">
                <UncontrolledCarousel
                  items={[
                    {
                      altText: "Slide 1",
                      caption: "Slide 1",
                      key: 1,
                      src: "assets/images/fares.jpg",
                    },
                    {
                      altText: "Slide 2",
                      caption: "Slide 2",
                      key: 2,
                      src: "assets/images/fight.jpg",
                    },
                    {
                      altText: "Slide 3",
                      caption: "Slide 3",
                      key: 3,
                      src: "assets/images/glory.jpg",
                    },
                  ]}
                />
              </div>

              {/*<img src="assets/images/fares.jpg" alt="" />*/}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="stats-section hero-section">
        <div className="stats-card">
          <h2>2,500</h2>
          <p>Total Athletes</p>
        </div>
        <div className="stats-card">
          <h2>300</h2>
          <p>Total Coaches</p>
        </div>
        <div className="stats-card">
          <h2>150</h2>
          <p>Total Trainers</p>
        </div>
        <div className="stats-card">
          <h2>10,000</h2>
          <p>Active Sessions</p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Section;
