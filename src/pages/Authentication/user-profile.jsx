import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "../../components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
import "../../../public/assets/styles/UserProfile.css";
// API service
import { getUserProfile, updateUser, uploadProfilePicture } from "../../service/apiUser"; // Ensure the import path is correct

const UserProfile = (props) => {
  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template";

  const [userData, setUserData] = useState({
    username: "Admin",
    email: "admin@example.com",
    profilePicture: avatar,
    phoneNumber: "",
    userId: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserProfile();
        setUserData({
          username: response.user.name || "Admin",
          email: response.user.email || "admin@example.com",
          profilePicture: response.user.image ? `http://localhost:3000/${response.user.image}` : avatar,
          phoneNumber: response.user.tel || "", // Make sure to correctly set the phone number from 'tel'
          userId: response.user._id || "", // Set _id from the response
        });
      } catch (error) {
        console.error("Une erreur est survenue lors de l'obtention de vos informations:", error);
        setError("Une erreur est survenue lors de l'obtention de vos informations.");
      }
    };

    fetchUserData();

    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  }, [success]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const response = await uploadProfilePicture(userData.userId, file);
        setUserData((prevData) => ({
          ...prevData,
          profilePicture: `http://localhost:3000/${response.image}`,
        }));
        setError(null);
        setSuccess("Votre photo de profil a été mise à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors du téléchargement de la photo de profil:", error);
        setSuccess(null);
        setError("Une erreur est survenue lors du téléchargement de votre photo de profil.");
      }
    }
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: userData.username || "",
      email: userData.email || "",
      phoneNumber: userData.phoneNumber || "", // Use 'phoneNumber' instead of 'tel'
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Veuillez entrer votre nom d'utilisateur"),
      email: Yup.string().email("Format d'email invalide").required("Veuillez entrer votre email"),
      phoneNumber: Yup.string().required("Veuillez entrer votre numéro de téléphone"),
    }),
    onSubmit: async (values) => {
      console.log('Mise à jour de l\'utilisateur avec les valeurs :', values); // Log the data being sent
      try {
        const response = await updateUser(userData.userId, values); // Pass _id to the update function
        setUserData(response);
        setError(null);
        setSuccess("Votre profil a été mis à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil utilisateur :", error);
        setSuccess(null);
        setError("Une erreur est survenue lors de la mise à jour de votre profil.");
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex position-relative">
                    <div className="profile-picture-container">
                      <img
                        src={userData.profilePicture}
                        alt=""
                        className=" rounded-circle img-thumbnail"
                      />
                      <div className="profile-picture-overlay">
                        <input type="file" onChange={handleFileChange} style={{ display: "none" }} id="profilePictureUpload" />
                        <label htmlFor="profilePictureUpload" className="overlay-label">
                          <i className="mdi mdi-camera"></i>Modifier
                        </label>
                      </div>
                    </div>
                    <div className="flex-grow-1 align-self-center ms-3">
                      <div className="text-muted">
                        <h5>{userData.username}</h5>
                        <p className="mb-0">Membre Cnot</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Modifier le profil</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">Nom d'utilisateur</Label>
                  <Input
                    name="username"
                    className="form-control"
                    placeholder="Entrer le nom d'utilisateur"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                </div>

                <div className="form-group">
                  <Label className="form-label">Email</Label>
                  <Input
                    name="email"
                    className="form-control"
                    placeholder="Entrer l'email"
                    type="email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={
                      validation.touched.email && validation.errors.email ? true : false
                    }
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                  ) : null}
                </div>

                <div className="form-group">
                  <Label className="form-label">Numéro de téléphone</Label>
                  <Input
                    name="phoneNumber"
                    className="form-control"
                    placeholder="Entrer le numéro de téléphone"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.phoneNumber || ""}
                    invalid={
                      validation.touched.phoneNumber && validation.errors.phoneNumber ? true : false
                    }
                  />
                  {validation.touched.phoneNumber && validation.errors.phoneNumber ? (
                    <FormFeedback type="invalid">{validation.errors.phoneNumber}</FormFeedback>
                  ) : null}
                </div>
              
                <div className=" text-center mt-4">
                  <Button type="submit" className="btn btn-primary btn-block">
                    Modifier
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
     
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
