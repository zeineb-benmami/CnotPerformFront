import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Images

const navItems = [
  { id: 1, idnm: "home", navheading: "Home" },
  { id: 2, idnm: "about", navheading: "About" },
  { id: 3, idnm: "features", navheading: "Services" },
  { id: 4, idnm: "news", navheading: "Events" },
  { id: 5, idnm: "contact", navheading: "Contact" },
];

const Navbar_Page = (props) => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  //Store all NavigationbaFr Id into TargetID variable(Used for Scrollspy)
  let TargetId = navItems.map((item) => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navigation fixed-top nav-sticky sticky bg-dark">
        <Container>
          <Link className="navbar-logo" to="/home">
            <img
              src="assets/images/logo/thunder.png"
              alt=""
              style={{ width: "90px", height: "90px", padding: "10px" }}
              className="logo logo-dark"
            />
          </Link>

          <NavbarToggler
            className="p-0"
            onClick={() => {
              setisOpenMenu();
            }}
          >
            <i className="fa fa-fw fa-bars" />
          </NavbarToggler>

          <Collapse id="topnav-menu-content" isOpen={isOpenMenu} navbar>
            {props.isSimple ? (
              <ScrollspyNav
                scrollTargetIds={TargetId}
                scrollDuration="800"
                headerBackground="true"
                activeNavClass="active"
                className="navbar-collapse"
              >
                <Nav className="navbar-nav ms-auto" id="topnav-menu">
                  {navItems.map((item, key) => (
                    <NavItem
                      key={key}
                      className={item.navheading === "Home" ? "active" : ""}
                    >
                      <NavLink
                        className="text-2xl text-white"
                        href={"#" + item.idnm}
                      >
                        {" "}
                        {item.navheading}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
              </ScrollspyNav>
            ) : (
              <Nav className="navbar-nav ms-auto" id="topnav-menu">
                <NavItem className="Home">
                  <NavLink href="/landing"> Home</NavLink>
                </NavItem>
                <NavItem className="active">
                  <NavLink href="/articles"> Events</NavLink>
                </NavItem>
              </Nav>
            )}
            <div className="ms-lg-2">
              <Link to="/login">
                <Button
                  color="primary"
                  className="font-16 btn-block cta-button"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

Navbar_Page.propTypes = {
  imglight: PropTypes.any,
  navClass: PropTypes.string,

  isSimple: PropTypes.bool,
};

export default Navbar_Page;
