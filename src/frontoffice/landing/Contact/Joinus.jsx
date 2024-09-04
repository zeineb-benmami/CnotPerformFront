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
              <h1 className=" text-white">CNOT Perform</h1>
              <p className=" text-white">
                Rejoignez-nous pour améliorer votre performance athletic et
                atteindre vos objectifs.
              </p>
            </div>
            <div className="image">
              <img
                src="/public/assets/images/kick.jpg"
                alt="Athletes celebrating"
              />
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default Joinus;
