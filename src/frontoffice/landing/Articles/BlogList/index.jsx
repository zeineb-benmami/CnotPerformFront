import React from "react";
import { Container, Row } from "reactstrap";

import BlogList from "./BlogList";
import Navbar_Page from "../../Navbar/Navbar";
import Footer from "../../Footer/footer";

const Index = () => {
  //meta title
  document.title = "Evènements | CNOT PERFORM";

  return (
    <React.Fragment>
      <Navbar_Page isSimple={false} />
      <div className="page-content section hero-section">
        <Container fluid>
          <Row>
            <BlogList />
          </Row>
        </Container>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Index;
