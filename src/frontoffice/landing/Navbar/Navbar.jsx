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
import ProfileMenu1 from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu1";
import logo from "../../../assets/images/CNOT_logo.svg"
import Seclogo from "../../../../public/assets/images/logo/thunder.png";

//Import Images

const navItems = [
  { id: 1, idnm: "home", navheading: "Home" },
  { id: 2, idnm: "about", navheading: "About" },
  { id: 3, idnm: "features", navheading: "Services" },
  { id: 4, idnm: "bourses", navheading: "Bourses" },
  { id: 5, idnm: "news", navheading: "Events" },
  { id: 6, idnm: "contact", navheading: "Contact" },
];

const Navbar_Page = (props) => {
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const [isLoggedIn] = useState(!!localStorage.getItem("authUser"));

  //Store all NavigationbaFr Id into TargetID variable(Used for Scrollspy)
  let TargetId = navItems.map((item) => {
    return item.idnm;
  });

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navigation fixed-top nav-sticky sticky bg-dark">
        <Container>
        <div className="auth-logo-light d-flex align-items-center mt-5">
  <Link to="/" className="auth-logo-light position-relative">
    <div className="avatar-md profile-user-wid mb-4 ">
      <span className="avatar-title rounded-circle bg-light">
        <img
          src={logo}
          alt=""
          className=""
          height="35"
          width="35"
        />
      </span>
    </div>
  </Link>

  {/* Second Circle, slightly overlapping the first */}
  <Link to="/" className="auth-logo-light position-relative" style={{ marginLeft: '-15px' }}> {/* Negative margin to create overlap */}
    <div className="avatar-md profile-user-wid mb-4">
      <span className="avatar-title rounded-circle bg-light">
        <img
          src={Seclogo}
          alt="Second logo"
          className=""
          height="75"
          width="75"
        />
      </span>
    </div>
  </Link>
</div>

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
                <NavItem>
                  <NavLink className=" text-white" href="/home">
                    {" "}
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className=" text-white" href="/articles">
                    {" "}
                    Events
                  </NavLink>
                </NavItem>
              </Nav>
            )}
            <div className="ms-lg-2">
              {isLoggedIn ? (
                <ProfileMenu1 />
              ) : (
                <Link to="/login">
                  <Button
                    color="primary"
                    className="font-16 btn-block cta-button"
                  >
                    Se connecter
                  </Button>
                </Link>
              )}
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

Navbar_Page.propTypes = {
  isSimple: PropTypes.bool,
};

export default Navbar_Page;
