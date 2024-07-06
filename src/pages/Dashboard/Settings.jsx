import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { getUserProfile } from "../../service/apiUser"; // Ensure the import path is correct
import profile from "../../../public/assets/images/4.png";

const Settings = (props) => {
  const [user, setUser] = useState({
    username: "Admin",
    profilePicture: "/path/to/default/user1.jpg", // Default image path
    jobTitle: "Membre CNOT" // Default job title
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser({
          username: userData.user.name || "Admin",
          profilePicture: userData.user.image ? `http://localhost:3000/${userData.user.image}` : "/path/to/default/user1.jpg",
          jobTitle:"Membre CNOT"// Assuming user data includes jobTitle
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <React.Fragment>
      <Col xl={4}>

      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
          <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Bienvenue !</h5>
                        <p>Connectez pour continuer</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
              <img
                  src={user.profilePicture}
                  alt=""
                  className="avatar-sm rounded-circle img-thumbnail"
                />
              </div>
              <h5 className="font-size-15 text-truncate">Henry Price</h5>
              <p className="text-muted mb-0 text-truncate">UI/UX Designer</p>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">125</h5>
                    <p className="text-muted mb-0">Projects</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">$1245</h5>
                    <p className="text-muted mb-0">Revenue</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link
                    to=""
                    className="btn btn-primary  btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/*  <Card>
          <CardBody>
            <div className="d-flex">
              <div className="me-3">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="avatar-sm rounded-circle img-thumbnail"
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <div className="text-muted">
                      <h5 className="mb-1">{user.username}</h5>
                      <p className="mb-0">{user.jobTitle}</p>
                    </div>
                  </div>

                  <UncontrolledDropdown className="ms-2">
                    <DropdownToggle
                      className="btn btn-light btn-sm"
                      color="#eff2f7"
                      type="button"
                    >
                      <i className="bx bxs-cog align-middle me-1"></i> Consulter
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <Link className="dropdown-item" to="#">
                        Mon Profil
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Les Féderations
                      </Link>
                     
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>

                <hr />

                
              </div>
            </div>
          </CardBody>
        </Card>
*/}
        <Card>
          <CardBody>
            <div className="d-flex flex-wrap">
              <h5 className="card-title mb-3 me-2">Subscribes</h5>

              <UncontrolledDropdown className="ms-auto">
                <DropdownToggle
                  className="text-muted font-size-16"
                  color="white"
                  type="button"
                >
                  <i className="mdi mdi-dots-horizontal"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <Link className="dropdown-item" to="#">
                    Action
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Another action
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Something else
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    Separated link
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <div className="d-flex flex-wrap">
              <div>
                <p className="text-muted mb-1">Total Subscribe</p>
                <h4 className="mb-3">10,512</h4>
                <p className="text-success mb-0">
                  <span>
                    0.6 % <i className="mdi mdi-arrow-top-right ms-1"></i>
                  </span>
                </p>
              </div>
              <div className="ms-auto align-self-end">
                <i className="bx bx-group display-4 text-light"></i>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="p-4">
            <div className="text-center">
              <div className="avatar-md mx-auto mb-4">
                <div className="avatar-title bg-light rounded-circle text-primary h1">
                  <i className="mdi mdi-email-open"></i>
                </div>
              </div>

              <Row className="justify-content-center">
                <Col xl={10}>
                  <h4 className="text-primary">Subscribe !</h4>
                  <p className="text-muted font-size-14 mb-4">
                    Subscribe our newsletter and get notification to stay updated.
                  </p>

                  <div className="input-group bg-light rounded">
                    <input
                      type="email"
                      className="form-control bg-transparent border-0"
                      placeholder="Enter Email address"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary rounded"
                        type="button"
                        id="button-addon2"
                      >
                        <i className="bx bxs-paper-plane"></i>
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Settings;
