import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Countdown
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return (
      <>
        <div className="coming-box">
          00
          <span>Days</span>
        </div>
        <div className="coming-box">
          00
          <span>Hours</span>
        </div>
        <div className="coming-box">
          00
          <span>Minutes</span>
        </div>
        <div className="coming-box">
          00
          <span>Seconds</span>
        </div>
      </>
    );
  } else {
    // Render a countdown
    return (
      <>
        <div className="coming-box">
          {days}
          <span>Days</span>
        </div>
        <div className="coming-box">
          {hours}
          <span>Hours</span>
        </div>
        <div className="coming-box">
          {minutes}
          <span>Minutes</span>
        </div>
        <div className="coming-box">
          {seconds}
          <span>Seconds</span>
        </div>
      </>
    );
  }
};

const Section = () => {
  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div/>
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="text-white-50">
                <h1 className="fw-semibold hero-title mb-3 text-white">
                  Bienvenu à
                </h1>
                <h1 className="fw-semibold hero-title mb-3 text-white">
                  CNOT Perform
                </h1>
                <p className="font-size-14">
                  L'Intelligence Artificielle au service du sport
                </p>
              </div>
            </Col>
            <Col lg="6" md="8" sm="10" className="ms-lg-auto">
              <Card className="mt-lg-0 mb-0 mt-5 overflow-hidden">
                <CardHeader className="text-center">
                  <h5 className="mb-0">Actualités</h5>
                </CardHeader>
                <CardBody>
                  <iframe
                    src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FCNOTunisie%2Fposts%2Fpfbid025heVdFnEFhTXKRFfToGRzqydPRYwCzBe5fkV3MARia5Vrw8L9XdFeQtjD3PC6uaCl&show_text=false&width=500"
                    width="500"
                    height="498"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
