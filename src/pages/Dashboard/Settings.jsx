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
    jobTitle: "Membre CNOT", // Default job title
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser({
          username: userData.user.name || "Admin",
          profilePicture: userData.user.image
            ? `http://localhost:3000/${userData.user.image}`
            : "/path/to/default/user1.jpg",
          jobTitle: "Membre CNOT", // Assuming user data includes jobTitle
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
          <div className="bg-soft bg-primary">
            <Row>
              <Col xs={7}>
                <div className="p-4 text-primary">
                  <h5 className="text-primary">Bienvenue !</h5>
                  <p>Connectez pour continuer</p>
                </div>
              </Col>
              <Col className="align-self-end col-5">
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
              <div className="align-self-end ms-auto">
                <i className="bx bx-group display-4 text-light"></i>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Settings;
