import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../service/apiUser"; // Assurez-vous que le chemin d'importation est correct
import withRouter from "../../Common/withRouter";

const ProfileMenu = ({ t }) => {
  const url = process.env.REACT_APP_BACKEND_URL;

  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState({
    username: "Admin",
    profilePicture: "/path/to/default/user1.jpg", // Default image path
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser({
          username: userData.user.name || "Admin",
          profilePicture: userData.user.image
            ? `${url}/${userData.user.image}`
            : "/path/to/default/user1.jpg",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    localStorage.removeItem("authUser"); // Supprimer le token du localStorage
    localStorage.removeItem("role");
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user.profilePicture}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block me-1 ms-2">
            {user.username}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/Chat">
            <i className="bx bx-wallet font-size-16 me-1 align-middle" />
            {t("Messagerie")}
          </DropdownItem>

          <DropdownItem tag="a" href="/Participations">
            <i className="bx bx-task font-size-16 me-1 align-middle" />
            {t("Mes participations")}
          </DropdownItem>

          <DropdownItem tag="a" href="/demandebourse">
            <i className="bx bx-file font-size-16 me-1 align-middle" />
            {t("Demande De Bourse")}
          </DropdownItem>

          <DropdownItem tag="a" href="/mybourses">
            <i className="bx bx-money font-size-16 me-1 align-middle" />
            {t("Mes Bourses")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item" onClick={logout}>
            <i className="bx bx-power-off font-size-16 text-danger me-1 align-middle" />
            {t("Logout")}
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  t: PropTypes.any,
};

export default withRouter(withTranslation()(ProfileMenu));
