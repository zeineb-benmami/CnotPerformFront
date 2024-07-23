import React from "react";
import { Container, Row, Col } from "reactstrap";

//Import Components
import FeatureBox from "./feature-box";

//Import images
import feature1 from "../../../assets/images/crypto/features-img/img-1.png";
import feature2 from "../../../assets/images/crypto/features-img/img-2.png";

const Features = () => {
  const features1 = [
    { id: 1, desc: "Donec pede justo vel aliquet" },
    { id: 2, desc: "Aenean et nisl sagittis" },
  ];
  const features2 = [
    { id: 1, desc: "Donec pede justo vel aliquet" },
    { id: 2, desc: "Aenean et nisl sagittis" },
  ];

  return (
    <React.Fragment>
      <section className="section" id="features">
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-5 text-center">
                <div className="small-title">Services</div>
                <h4>Nos services</h4>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center pt-4">
            <Col md="6" sm="8">
              <div>
                <img
                  src="assets/images/2.jpg"
                  alt=""
                  className="img-fluid d-block mx-auto"
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </Col>
            <Col md="5" className="ms-auto">
              {/* featurebox */}
              <FeatureBox
                num="01"
                title="Suivi des performances en temps réel"
                features={features1}
                desc="la plateforme permettra aux sportifs de suivre leurs performances en temps réel."
              />
            </Col>
          </Row>

          <Row className="align-items-center pt-md-5 mt-5">
            <Col md="5">
              {/* featurebox */}
              <FeatureBox
                num="02"
                title="Conseils personnalisés"
                features={features2}
                desc="la plateforme fournira des conseils personnalisés aux sportifs pour améliorer leurs performances."
              />
            </Col>
            <Col md="6" sm="8" className="ms-md-auto">
              <div className="me-md-0 mt-4 rounded-md">
                <img
                  src="assets/images/3.jpg"
                  alt=""
                  className="img-fluid d-block mx-auto"
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Features;
