import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
    Row,
    Col,
    CardBody,
    Card,
    Container,
    Form,
    Input,
    FormFeedback,
    Label,
    Badge,
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import blessureIcon from "../../../assets/images/icon/blessure.png";
import { athletismeInjuryPrediction } from '../../../service/aiService';

function AthBlessure() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [result, setResult] = useState(null);
    const { id } = useParams();
    const [bourseDate, setBourseDate] = useState(new Date());
    const [federationId, setFederationId] = useState(null);
    const [initialValues, setInitialValues] = useState({
        totalKmZ3_4_2: '',
        maxKmZ3_4OneDay_2: '',
        nrStrengthTrainings_2: '',
        totalKmZ5_T1_T2: '',
        totalKmZ3_4: '',
        nrStrengthTrainings:'',
        totalKmZ3_4_1: '',
        nrToughSessions: '',
        maxKmZ3_4OneDay: '',
    })

    const validation = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            totalKmZ3_4_2: Yup.number()
                .required('Distance totale parcourue dans les zones Z3 et Z4 (en km) est obligatoire'),
            maxKmZ3_4OneDay_2: Yup.number()
                .required('Distance maximale parcourue dans les zones Z3 et Z4 de la deuxième session (en km) est obligatoire'),
            nrStrengthTrainings_2: Yup.number()
                .required('Nombre de séances de force réalisées est obligatoire'),
            totalKmZ5_T1_T2: Yup.number()
                .required('Distance totale parcourue dans les zones Z5, T1, et T2 lors de la deuxième session (en km) est obligatoire'),
            totalKmZ3_4: Yup.number()
                .required('Distance totale parcourue dans les zones Z3 et Z4 lors de la session générale (en km) est obligatoire'),
            nrStrengthTrainings: Yup.number()
                .required('Nombre de séances de force pendant la session générale est obligatoire'),
            totalKmZ3_4_1: Yup.number()
                .required('Distance totale parcourue dans les zones Z3 et Z4 lors de la première session (en km) est obligatoire'),
            nrToughSessions: Yup.number()
                .required('Nombre de séances intenses dans les zones Z5, T1, ou T2 est obligatoire'),
            maxKmZ3_4OneDay: Yup.number()
                .required('Distance maximale parcourue dans les zones Z3 et Z4 en une journée d’entraînement (en km) est obligatoire'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {              
                                // Call the API
                                const response = await athletismeInjuryPrediction(values);
                                setResult(response.data.prediction); // Assuming prediction returns a numerical value
                                toggle();
                                resetForm();
                
            } catch (error) {
                console.error('Submission error:', error);
            }
        }
    });


    return (
    <React.Fragment>
      <section className="section hero-section mt-5" id="home">
        <div className="glow-container">
          <div className="glow-circle left"></div>
          <div className="glow-circle right"></div>
        </div>
        <Container className='mt-5'>
                        <Row className="justify-content-center">
                            <Col md={12} lg={12} xl={12}>
                                <Card className="overflow-hidden">
                                    <div className="bg-primary bg-soft">
                                        <Row>
                                            <Col xs={7}>
                                                <div className="text-primary p-4">
                                                    <h5 className="text-primary">Athletisme</h5>
                                                    <p>Prédiction de blessure</p>
                                                </div>
                                            </Col>
                                            <Col className="col-5 align-self-end">
                                                <img alt="" className="img-fluid" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <CardBody className="pt-0">
                                        <div>
                                            <Link to="/" className="auth-logo-light">
                                                <div className="avatar-md profile-user-wid mb-4">
                                                    <span className="avatar-title rounded-circle bg-light">
                                                    <img
                                                            src={blessureIcon}
                                                            alt=""
                                                            className=""
                                                            height="35"
                                                            width="35"
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

                                                <div className="mb-3">
                                                    <Label className="form-label">Distance totale parcourue dans les zones Z3 et Z4 (en km)</Label>
                                                    <Input
                                                        name="totalKmZ3_4_2"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.totalKmZ3_4_2 || ""}
                                                        invalid={
                                                            validation.touched.totalKmZ3_4_2 && validation.errors.totalKmZ3_4_2
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.totalKmZ3_4_2 && validation.errors.totalKmZ3_4_2 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.totalKmZ3_4_2}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">istance maximale parcourue dans les zones Z3 et Z4 de la deuxième session (en km)</Label>
                                                    <Input
                                                        name="maxKmZ3_4OneDay_2"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.maxKmZ3_4OneDay_2 || ""}
                                                        invalid={
                                                            validation.touched.maxKmZ3_4OneDay_2 && validation.errors.maxKmZ3_4OneDay_2
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.maxKmZ3_4OneDay_2 && validation.errors.maxKmZ3_4OneDay_2 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.maxKmZ3_4OneDay_2}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre de séances de force</Label>
                                                    <Input
                                                        name="nrStrengthTrainings_2"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nrStrengthTrainings_2 || ""}
                                                        invalid={
                                                            validation.touched.nrStrengthTrainings_2 && validation.errors.nrStrengthTrainings_2
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nrStrengthTrainings_2 && validation.errors.nrStrengthTrainings_2 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nrStrengthTrainings_2}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Distance totale parcourue dans les zones Z5, T1, et T2 lors de la deuxième session (en km)</Label>
                                                    <Input
                                                        name="totalKmZ5_T1_T2"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.totalKmZ5_T1_T2 || ""}
                                                        invalid={
                                                            validation.touched.totalKmZ5_T1_T2 && validation.errors.totalKmZ5_T1_T2
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.totalKmZ5_T1_T2 && validation.errors.totalKmZ5_T1_T2 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.totalKmZ5_T1_T2}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Distance totale parcourue dans les zones Z3 et Z4 lors de la session générale (en km)</Label>
                                                    <Input
                                                        name="totalKmZ3_4"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.totalKmZ3_4 || ""}
                                                        invalid={
                                                            validation.touched.totalKmZ3_4 && validation.errors.totalKmZ3_4
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.totalKmZ3_4 && validation.errors.totalKmZ3_4 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.totalKmZ3_4}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre de séances de force pendant la session générale</Label>
                                                    <Input
                                                        name="nrStrengthTrainings"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nrStrengthTrainings || ""}
                                                        invalid={
                                                            validation.touched.nrStrengthTrainings && validation.errors.nrStrengthTrainings
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nrStrengthTrainings && validation.errors.nrStrengthTrainings ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nrStrengthTrainings}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Distance totale parcourue dans les zones Z3 et Z4 lors de la première session (en km)</Label>
                                                    <Input
                                                        name="totalKmZ3_4_1"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.totalKmZ3_4_1 || ""}
                                                        invalid={
                                                            validation.touched.totalKmZ3_4_1 && validation.errors.totalKmZ3_4_1
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.totalKmZ3_4_1 && validation.errors.totalKmZ3_4_1 ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.totalKmZ3_4_1}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre de séances intenses dans les zones Z5, T1, ou T2</Label>
                                                    <Input
                                                        name="nrToughSessions"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nrToughSessions || ""}
                                                        invalid={
                                                            validation.touched.nrToughSessions && validation.errors.nrToughSessions
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nrToughSessions && validation.errors.nrToughSessions ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nrToughSessions}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Distance maximale parcourue dans les zones Z3 et Z4 en une journée d’entraînement (en km)</Label>
                                                    <Input
                                                        name="maxKmZ3_4OneDay"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.maxKmZ3_4OneDay || ""}
                                                        invalid={
                                                            validation.touched.maxKmZ3_4OneDay && validation.errors.maxKmZ3_4OneDay
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.maxKmZ3_4OneDay && validation.errors.maxKmZ3_4OneDay ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.maxKmZ3_4OneDay}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mt-4 d-grid">
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        type="submit"
                                                    >
                                                        Prédire
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
        </Container>
        </section>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Résultat</ModalHeader>
        <ModalBody>
          {result == 0 ? 
          (<div className="text-center p-4">
            <iframe 
              src="https://lottie.host/embed/edac2dcd-33b9-4c08-b15a-56b68004a0d3/g6YcIsXoZ7.json" 
              className="mx-auto mb-4" 
              style={{ width: '300px', height: '300px', border: 'none' }}
              title="Animation"
            ></iframe>
            <div className="alert alert-success rounded-3 shadow-sm">
              <h4 className="alert-heading">Aucun risque de blessure détecté</h4>
              <p className="mb-0">Continuez à vous entraîner en toute sécurité.</p>
            </div>
          </div>
           ) 
          : (<div className="text-center p-4">
            <iframe 
              src="https://lottie.host/embed/2f874dbb-6e8c-4c7e-b955-9b88be39f7af/ziS3nsTvG8.json" 
              className="mx-auto mb-4" 
              style={{ width: '300px', height: '300px', border: 'none' }}
              title="Animation"
            ></iframe>
            <div className="alert alert-danger rounded-3 shadow-sm">
              <h4 className="alert-heading">Attention, une blessure est probable</h4>
              <p className="mb-0">Prenez les précautions nécessaires.</p>
            </div>
          </div> )
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
    );
}

export default AthBlessure;
