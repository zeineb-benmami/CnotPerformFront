import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//Images
import client1 from "../../../assets/images/clients/1.png";
import client2 from "../../../assets/images/clients/2.png";
import client3 from "../../../assets/images/clients/3.png";
import client4 from "../../../assets/images/clients/4.png";
import client5 from "../../../assets/images/clients/5.png";
import client6 from "../../../assets/images/clients/6.png";

const AboutUs = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);

  return (
    <React.Fragment>
      <section className="section hero-section" id="about">
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
                <h2>About Us</h2>
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

          <Row>
            <Col lg="12">
              <Col lg="12">
                <div className="hori-timeline">
                  <div
                    className="owl-carousel owl-theme  navs-carousel events"
                    id="timeline-carousel"
                  >
                    {step1 ? (
                      <>
                        <Row>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client1}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client2}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client3}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client4}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    {step2 ? (
                      <>
                        <Row>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client4}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client5}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={3}>
                            <div className="item">
                              <div className="client-images">
                                <img
                                  src={client6}
                                  alt="client-img"
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    <div className="owl-nav" style={{ textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setStep1(true);
                          setStep2(false);
                        }}
                        className="border-0"
                        disabled={step1}
                      >
                        <i className="mdi mdi-chevron-left" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setStep1(false);
                          setStep2(true);
                        }}
                        className="border-0"
                        disabled={step2}
                      >
                        <i className="mdi mdi-chevron-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
