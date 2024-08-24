import React from "react";
import { Link } from "react-router-dom";
import { Row, Container } from "reactstrap";

const Joinus = () => {
  return (
    <section className="section hero-section">
      <div className="glow-container">
        <div className="glow-circle left"></div>
        <div className="glow-circle right"></div>
      </div>
      <Container>
        <Row>
          <div className="membership-banner">
            <div className="content">
              <h1 className=" text-white">DEVENIR UN MEMBER</h1>
              <p className=" text-white">
                Join us to improve your athletic performance and achieve your
                goals.
              </p>
              <Link to="/login">
                <button className="cta-button">Get Started</button>
              </Link>
            </div>
            <div className="image">
              <img src="assets/images/1.jpg" alt="Athletes celebrating" />
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Joinus;
