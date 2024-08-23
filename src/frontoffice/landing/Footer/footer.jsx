import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

//Import Components
import FooterLink from "./footer-link";

const Features = () => {
  const footerLinks = [
    {
      title: "Entreprise",
      links: [
        { title: "About Us", link: "#" },
        { title: "Features", link: "#" },
        { title: "Team", link: "#" },
        { title: "News", link: "#" },
        { title: "FAQs", link: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Privacy Policy", link: "#" },
        { title: "Terms & Conditions", link: "#" },
      ],
    },
  ];

  return (
    <React.Fragment>
      <footer className="landing-footer">
        <Container>
          <Row>
            {footerLinks.map((footerLink, key) => (
              <Col lg="4" sm="6" key={key}>
                <div className="mb-lg-0 mb-4">
                  <h5 className="footer-list-title mb-3">{footerLink.title}</h5>
                  <ul className="list-unstyled footer-list-menu">
                    {footerLink.links.map((Flink, key) => (
                      <li key={key}>
                        <Link to={Flink.link}>{Flink.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
            <Col lg="4" sm="6">
              <div className="mb-lg-0 mb-4">
                <ul className="list-unstyled footer-list-menu flex flex-row gap-3">
                  <li>
                    <a
                      href="https://www.facebook.com/CNOTunisie"
                      target="_blank"
                      title="Facebook"
                    >
                      <img
                        src="/public/assets/images/icons/facebook-colored.svg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://www.cnot.org.tn"
                      target="_blank"
                      title="CNOT.ORG"
                    >
                      <img
                        src="/public/assets/images/icons/google-colored.svg"
                        alt=""
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      title="Youtube"
                    >
                      <img
                        src="/public/assets/images/icons/youtube-colored.svg"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>

          <hr className="footer-border my-2" />

          <FooterLink />
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Features;
