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
      <section className="section hero-section bg-ico-hero" id="about">
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-5 text-center">
                <div className="small-title">About us</div>
                <h4 className="text-white">CNOT PERFORM</h4>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center position-relative">
  <img
    src="/assets/frontImages/49cfcc26d609851f998e68c911138652.png"
    alt=""
    className="position-absolute inset-0 object-cover z-n1"
    style={{ top: 0, left: 0 }}
  />
  <Col lg="5" className="position-relative">
    <div className="text-white position-relative z-1 bg-gradient-to-r from-slate-100 to-slate-900">
      <h4>Contexte & objectifs</h4>
      <p>
        CNOT Perform révolutionne l'entraînement sportif grâce à
        l'Intelligence Artificielle.
      </p>
      <p className="mb-4">
        Suivez vos performances en temps réel, analysez vos données
        pour identifier vos points forts et faibles, recevez des
        conseils personnalisés et prévenez les blessures.
        Rejoignez-nous pour améliorer vos performances sportives et
        atteindre vos objectifs.
      </p>

      <div className="d-flex flex-wrap gap-2">
        <Link
          to="#"
          className="btn btn-primary"
          style={{ borderRadius: "25px" }}
        >
          Read More
        </Link>
      </div>
    </div>
  </Col>

  <Col lg="6" className="ms-auto position-relative">
    <div className="mt-lg-0 mt-4 position-relative z-1">
      <Row>
        <Col sm="12" className="mx-auto">
          <div>
            <img src="assets/frontImages/002db2a2e1b9edef28d103d6e495ea00.png" alt="" />
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
