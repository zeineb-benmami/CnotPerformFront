import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import profile from "../../../public/assets/images/4.png";
import logo from "../../assets/images/CNOT_logo.svg";
import axios from "axios";

const Login = () => {
  document.title = "Login | Skote - Vite React Admin & Dashboard Template";
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/signin",
        user
      );
      localStorage.setItem("authUser", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    }
  };

  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email invalide")
        .required("Email est obligatoire"),
      password: Yup.string().required("Motde passe est obligatoire"),
    }),
    onSubmit: (values) => {
      signin(values);
    },
  });

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages pt-sm-5 my-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
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
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className=""
                            height="35" // Adjust the height to make the logo smaller
                            width="35" // Adjust the width to maintain aspect ratio and make the logo smaller
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                      }}
                    >
                      {error && <Alert color="danger">{error}</Alert>}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mot de passe</Label>
                        <Input
                          name="password"
                          value={validation.values.password || ""}
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="d-grid mt-3">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          style={{ borderRadius: "25px" }}
                        >
                          Se Connecter
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Mot de passe oubliée?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  vous n'avez pas un compte ?{" "}
                  <Link
                    to="/register"
                    className="fw-medium text-primary"
                    style={{ borderRadius: "25px" }}
                  >
                    {" "}
                    S'inscrire{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} . Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Esprit students
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
