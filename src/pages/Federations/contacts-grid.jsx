import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import { Col, Container, Row, Input } from "reactstrap";
import { map } from "lodash";

// Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

// Import Card
import CardContact from "./card-contact";

// API call
import { getRoleF, searchUsersByName } from "../../service/apiUser";

const ContactsGrid = () => {
  document.title = "User Grid | Skote - Vite React Admin & Dashboard Template";

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await getRoleF();
      if (response.success) {
        console.log("Fetched users:", response.users); // Log fetched users
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Failed to fetch users with role F:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    console.log("Search term:", term); // Log the search term

    if (term.length > 0) {
      try {
        const response = await searchUsersByName(term);
        if (response.success) {
          console.log("Searched users:", response.users); // Log the searched users
          setUsers(response.users);
        }
      } catch (error) {
        console.error("Failed to search users:", error);
      }
    } else {
      fetchUsers();
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User Grid" />

          {/* Search Bar */}
          <Row className="mb-3 justify-content-center">
            <Col lg="6">
              <form className="app-search d-lg-block">
                <div className="position-relative">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Search Federation..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </form>
            </Col>
          </Row>

          <Row>
            {users.length > 0 ? (
              map(users, (user, key) => (
                <CardContact user={user} key={"_user_" + key} />
              ))
            ) : (
              <p className="text-center">No users found</p>
            )}
          </Row>

          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-hourglass bx-spin me-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsGrid);
