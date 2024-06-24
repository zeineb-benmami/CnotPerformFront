import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signup } from "../../service/apiUser";
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/CNOT_logo.svg";
import { registerUser, apiError } from "../../store/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Register = (props) => {
  document.title = "Register | Skote - Vite React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [certificate, setCertificate] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages

  const tunisianRegions = [
    "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa",
    "Jendouba", "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia",
    "Manouba", "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid",
    "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
  ];

  const validationSchemaStep1 = Yup.object({
    name: Yup.string().required("Please Enter Your Name"),
    email: Yup.string().email("Invalid email").required("Please Enter Your Email"),
    password: Yup.string().required("Please Enter Your Password").min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Please confirm your password"),
  });

  const validationSchemaStep2 = Yup.object({
    address: Yup.string().required("Please Enter Your Address"),
    tel: Yup.string().required("Please Enter Your Phone Number"),
    certificate: Yup.mixed().required("Please Upload Your Certificate"),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      tel: '',
    },
    validationSchema: currentStep === 0 ? validationSchemaStep1 : validationSchemaStep2,
    onSubmit: async (values) => {
      if (currentStep === 0) {
        setCurrentStep(1);
      } else {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("address", values.address);
        formData.append("tel", values.tel);
        formData.append("certificate", certificate);

        try {
          await signup(formData);
          setSuccessMessage('Register User Successfully');
          setErrorMessage(""); // Clear any previous error messages
          validation.resetForm();
          setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } catch (error) {
          setErrorMessage(error); // Set the full error message
          setSuccessMessage(""); // Clear any previous success messages
        }
      }
    }
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'application/pdf, image/*',
    onDrop: (acceptedFiles) => {
      setCertificate(acceptedFiles[0]);
      validation.setFieldValue("certificate", acceptedFiles[0]);
    },
  });

  const { user, registrationError } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
  }));

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Skote account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className=""
                            height="34"
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
                        return false;
                      }}
                    >
                      {successMessage && (
                        <Alert color="success">
                          {successMessage}
                        </Alert>
                      )}

                      {errorMessage && (
                        <Alert color="danger">
                          {Array.isArray(errorMessage) ? (
                            <ul>
                              {errorMessage.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          ) : (
                            <span>{errorMessage}</span>
                          )}
                        </Alert>
                      )}

                      {currentStep === 0 ? (
                        <>
                          <div className="mb-3">
                            <Label className="form-label">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              className="form-control"
                              placeholder="Enter name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.name || ""}
                              invalid={
                                validation.touched.name && validation.errors.name ? true : false
                              }
                            />
                            {validation.touched.name && validation.errors.name ? (
                              <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Enter email"
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
                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password || ""}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Confirm Password</Label>
                            <Input
                              name="confirmPassword"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.confirmPassword || ""}
                              invalid={
                                validation.touched.confirmPassword && validation.errors.confirmPassword ? true : false
                              }
                            />
                            {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                              <FormFeedback type="invalid">{validation.errors.confirmPassword}</FormFeedback>
                            ) : null}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-3">
                            <Label className="form-label">Address</Label>
                            <Input
                              type="select"
                              name="address"
                              value={validation.values.address}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.address && validation.errors.address ? true : false
                              }
                            >
                              <option value="">Select your region</option>
                              {tunisianRegions.map(region => (
                                <option key={region} value={region}>{region}</option>
                              ))}
                            </Input>
                            {validation.touched.address && validation.errors.address ? (
                              <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Phone Number</Label>
                            <Input
                              id="tel"
                              name="tel"
                              className="form-control"
                              placeholder="Enter phone number"
                              type="tel"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.tel || ""}
                              invalid={
                                validation.touched.tel && validation.errors.tel ? true : false
                              }
                            />
                            {validation.touched.tel && validation.errors.tel ? (
                              <FormFeedback type="invalid">{validation.errors.tel}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Certificate</Label>
                            <div {...getRootProps()} className="dropzone mb-3">
                              <input {...getInputProps()} />
                              {certificate ? (
                                <p>{certificate.name}</p>
                              ) : (
                                <p>Drag 'n' drop some files here, or click to select files</p>
                              )}
                            </div>
                            {validation.touched.certificate && validation.errors.certificate ? (
                              <FormFeedback type="invalid">{validation.errors.certificate}</FormFeedback>
                            ) : null}
                          </div>
                        </>
                      )}

                      <div className="mt-4 d-flex justify-content-end">
                        {currentStep === 1 && (
                          <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={() => setCurrentStep(0)}
                          >
                            <FontAwesomeIcon icon={faArrowLeft} /> Back
                          </button>
                        )}
                        <button
                          className="btn btn-primary"
                          type="submit"
                        >
                          {currentStep === 0 ? 'Next' : 'Register'}
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
