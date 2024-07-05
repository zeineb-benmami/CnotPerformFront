import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Nav,
  NavbarToggler,
  NavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollspyNav from "./scrollSpy";

//Import Images

import logo from "../../../../public/assets/images/logo/CNOT_icon.png";

import cnotlogo from "../../../assets/images/CNOT_logo.svg";

const navItems = [
  { id: 1, idnm: "home", navheading: "Home" },
  { id: 2, idnm: "about", navheading: "About" },
  { id: 3, idnm: "features", navheading: "Features" },
  { id: 3, idnm: "roadmap", navheading: "Roadmap" },
  { id: 4, idnm: "team", navheading: "Team" },
  { id: 5, idnm: "news", navheading: "News" },
  { id: 6, idnm: "faqs", navheading: "FAQs" },
];

const Navbar_Page = (props) => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  //Store all NavigationbaFr Id into TargetID variable(Used for Scrollspy)
  let TargetId = navItems.map((item) => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navigation fixed-top sticky " +
          props.navClass
        }
      >
        <Container>
          <Link className="navbar-logo" to="/">
            {props.imglight !== true ? (
              <img
                src={cnotlogo}
                alt=""
                style={{ width: "200px", height: "90px", padding: "10px" }}
                className="logo logo-dark"
              />
            ) : (
              <img
                src={logo}
                alt=""
                style={{ width: "80px", height: "90px", padding: "10px" }}
                className="logo logo-light"
              />
            )}
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
                    <NavLink href={"#" + item.idnm}> {item.navheading}</NavLink>
                  </NavItem>
                ))}
              </Nav>
            </ScrollspyNav>
            <div className="ms-lg-2">
              <Link to="#" className="btn btn-outline-success w-xs">
                Sign in
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
};

export default Navbar_Page;
