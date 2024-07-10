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
      <section className="section bg-white pt-4" id="about">
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-5 text-center">
                <div className="small-title">About us</div>
                <h4>CNOT PERFORM</h4>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col lg="5">
              <div className="text-muted">
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

            <Col lg="6" className="ms-auto">
              <div className="mt-lg-0 mt-4">
                <Row>
                  <Col sm="6">
                    <Card className="border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-bitcoin h2 text-success" />
                        </div>
                        <h5>Lending</h5>
                        <p className="text-muted mb-0">
                          At vero eos et accusamus et iusto blanditiis
                        </p>
                      </CardBody>
                      <div className="card-footer border-top bg-transparent text-center">
                        <Link to="#" className="text-primary">
                          Learn more
                        </Link>
                      </div>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card className="mt-lg-5 border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-wallet-outline h2 text-success" />
                        </div>
                        <h5>Wallet</h5>
                        <p className="text-muted mb-0">
                          Quis autem vel eum iure reprehenderit
                        </p>
                      </CardBody>
                      <div className="card-footer border-top bg-transparent text-center">
                        <Link to="#" className="text-primary">
                          Learn more
                        </Link>
                      </div>
                    </Card>
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
