import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactApexChart from "react-apexcharts";
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
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Select from 'react-select';
import blessureIcon from "../../../assets/images/icon/blessure.png";
import { getRoleFName } from '../../../service/apiUser';
import DatePicker from "react-datepicker";
import { addBourse, editBourse, getBoursebyId } from '../../../service/bourseService';
import axios from 'axios';
import { boxInjuryPrediction } from '../../../service/aiService';

function BoxeBlessure() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [result, setResult] = useState(null);
    const { id } = useParams();
    const [bourseDate, setBourseDate] = useState(new Date());
    const [federationId, setFederationId] = useState(null);
    const [featureImportance, setFeatureImportance] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);
    const [series, setSeries] = useState(null);
    const [initialValues, setInitialValues] = useState({
        nr_sessions: 0,
        nr_rest_days: 0,
        total_hours_training: 0,
        max_hours_one_day:0,
        total_hours_high_intensity :0,
        nr_tough_sessions : 0,
        nr_days_with_interval_session : 0,
        total_hours_moderate_intensity : 0,
        max_hours_moderate_intensity_one_day : 0,
        max_hours_high_intensity_one_day : 0,
        total_hours_alternative_training : 0,
        nr_strength_trainings : 0,
        max_exertion : 0,
        max_training_success : 0,
        max_recovery : 0
    })

    const validation = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            nr_sessions: Yup.number()
                .required('Nombre de séances est obligatoire'),
            nr_rest_days : Yup.number()
                .required('Nombre de jours de repos est obligatoire'),
                total_hours_training: Yup.number()
                .required('Total des heures d\'entraînement est obligatoire'),
                max_hours_one_day: Yup.number()
                .required('Heures maximales en une journée est obligatoire'),
                total_hours_high_intensity: Yup.number()
                .required('Total des heures d\'entraînement à haute intensité est obligatoire'),
                nr_tough_sessions : Yup.number()
                .required('Nombre de séances difficiles est obligatoire'),
                nr_days_with_interval_session : Yup.number()
                .required('Nombre de jours avec une séance à intervalles est obligatoire'),
                total_hours_moderate_intensity : Yup.number()
                .required(' Total des heures d\'entraînement à intensité modérée est obligatoire'),
                max_hours_moderate_intensity_one_day : Yup.number()
                .required('Heures maximales à intensité modérée en une journée est obligatoire'),
                max_hours_high_intensity_one_day : Yup.number()
                .required('Heures maximales à haute intensité en une journée est obligatoire'),
                total_hours_alternative_training : Yup.number()
                .required('Total des heures d\'entraînement alternatif est obligatoire'),
                nr_strength_trainings : Yup.number()
                .required('Nombre d\'entraînements de musculation est obligatoire'),
                max_exertion : Yup.number()
                .required('Effort maximal est obligatoire'),
                max_training_success : Yup.number()
                .required('Succès d\'entraînement maximal est obligatoire'),
                max_recovery : Yup.number()
                .required('Récupération maximale est obligatoire'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {              
                                // Call the API
                                const response = await boxInjuryPrediction(values);
                                setResult(response.data.prediction); // Assuming prediction returns a numerical value
                                const feature = response.data.feature_importance;
                                const importance = {
                                    "Effort maximal": feature.max_exertion,
                                    "Heures maximales à haute intensité en une journée": feature.max_hours_high_intensity_one_day,
                                    "Heures maximales à intensité modérée en une journée": feature.max_hours_moderate_intensity_one_day,
                                    "Nombre des heures maximales en une journée": feature.max_hours_one_day,
                                    "Récupération maximale": feature.max_recovery,
                                    "Succès d'entraînement maximal": feature.max_training_success,
                                    "Nombre de jours avec une séance à intervalles": feature.nr_days_with_interval_session,
                                    "Nombre des Jours de repos": feature.nr_rest_days,
                                    "Nombre des séances d'entraînement": feature.nr_sessions,
                                    "Nombre d'entraînements de musculation": feature.nr_strength_trainings,
                                    "Nombre de séances difficiles": feature.nr_tough_sessions,
                                    "Total des heures d'entraînement alternatif": feature.total_hours_alternative_training,
                                    "Total des heures d'entraînement à haute intensité": feature.total_hours_high_intensity,
                                    "Total des heures d'entraînement à intensité modérée": feature.total_hours_moderate_intensity,
                                    "Nombre des heures d'entraînement": feature.total_hours_training
                                  };
                                setFeatureImportance(importance);
                                const labels = Object.keys(importance);
                                setSeries(Object.values(importance));
                              
                                 setChartOptions({
                                  chart: {
                                    type: 'pie',
                                    height: 500
                                  },
                                  responsive: [
                                    {
                                      breakpoint: 480,
                                      options: {
                                        chart: {
                                          width: "100%", // or a specific value like 300
                                          height: 250, // Adjust for smaller screens
                                        },
                                        legend: {
                                          position: "bottom",
                                        },
                                      },
                                    },
                                    {
                                      breakpoint: 768,
                                      options: {
                                        chart: {
                                          width: "100%", // Medium screens
                                          height: 500,
                                        },
                                        legend: {
                                          position: "right",
                                        },
                                      },
                                    },
                                  ],
                                  labels: labels,
                                  series: series,
                                  tooltip: {
                                    y: {
                                      formatter: (val) => val.toFixed(2)
                                    }
                                  },
                                  colors: ['#ff4560', '#008ffb', '#00e396', '#775dd0', '#feb019', '#ff4560', '#f15b46', '#3f51b5', '#546e7a']
                                });
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
                                                    <Label className="form-label">Nombre des séances d'entraînement</Label>
                                                    <Input
                                                        name="nr_sessions"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nr_sessions || ""}
                                                        invalid={
                                                            validation.touched.nr_sessions && validation.errors.nr_sessions
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nr_sessions && validation.errors.nr_sessions ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nr_sessions}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre des Jours de repos</Label>
                                                    <Input
                                                        name="nr_rest_days"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nr_rest_days || ""}
                                                        invalid={
                                                            validation.touched.nr_rest_days && validation.errors.nr_rest_days
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nr_rest_days && validation.errors.nr_rest_days ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nr_rest_days}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre des heures d'entraînement</Label>
                                                    <Input
                                                        name="total_hours_training"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.total_hours_training || ""}
                                                        invalid={
                                                            validation.touched.total_hours_training && validation.errors.total_hours_training
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.total_hours_training && validation.errors.total_hours_training ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.total_hours_training}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre des heures maximales en une journée</Label>
                                                    <Input
                                                        name="max_hours_one_day"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.max_hours_one_day || ""}
                                                        invalid={
                                                            validation.touched.max_hours_one_day && validation.errors.max_hours_one_day
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.max_hours_one_day && validation.errors.max_hours_one_day ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.max_hours_one_day}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Total des heures d'entraînement à haute intensité</Label>
                                                    <Input
                                                        name="total_hours_high_intensity"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.total_hours_high_intensity || ""}
                                                        invalid={
                                                            validation.touched.total_hours_high_intensity && validation.errors.total_hours_high_intensity
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.total_hours_high_intensity && validation.errors.total_hours_high_intensity ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.total_hours_high_intensity}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre de séances difficiles</Label>
                                                    <Input
                                                        name="nr_tough_sessions"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nr_tough_sessions  || ""}
                                                        invalid={
                                                            validation.touched.nr_tough_sessions  && validation.errors.nr_tough_sessions 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nr_tough_sessions  && validation.errors.nr_tough_sessions  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nr_tough_sessions }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre de jours avec une séance à intervalles</Label>
                                                    <Input
                                                        name="nr_days_with_interval_session"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nr_days_with_interval_session  || ""}
                                                        invalid={
                                                            validation.touched.nr_days_with_interval_session  && validation.errors.nr_days_with_interval_session 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nr_days_with_interval_session  && validation.errors.nr_days_with_interval_session  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nr_days_with_interval_session }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Total des heures d'entraînement à intensité modérée</Label>
                                                    <Input
                                                        name="total_hours_moderate_intensity"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.total_hours_moderate_intensity  || ""}
                                                        invalid={
                                                            validation.touched.total_hours_moderate_intensity  && validation.errors.total_hours_moderate_intensity 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.total_hours_moderate_intensity  && validation.errors.total_hours_moderate_intensity  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.total_hours_moderate_intensity }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label"> Heures maximales à intensité modérée en une journée</Label>
                                                    <Input
                                                        name="max_hours_moderate_intensity_one_day"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.max_hours_moderate_intensity_one_day  || ""}
                                                        invalid={
                                                            validation.touched.max_hours_moderate_intensity_one_day  && validation.errors.max_hours_moderate_intensity_one_day 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.max_hours_moderate_intensity_one_day  && validation.errors.max_hours_moderate_intensity_one_day  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.max_hours_moderate_intensity_one_day }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Heures maximales à haute intensité en une journée</Label>
                                                    <Input
                                                        name="max_hours_high_intensity_one_day"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.max_hours_high_intensity_one_day || ""}
                                                        invalid={
                                                            validation.touched.max_hours_high_intensity_one_day && validation.errors.max_hours_high_intensity_one_day
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.max_hours_high_intensity_one_day && validation.errors.max_hours_high_intensity_one_day ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.max_hours_high_intensity_one_day}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Total des heures d'entraînement alternatif</Label>
                                                    <Input
                                                        name="total_hours_alternative_training"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.total_hours_alternative_training  || ""}
                                                        invalid={
                                                            validation.touched.total_hours_alternative_training  && validation.errors.total_hours_alternative_training 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.total_hours_alternative_training  && validation.errors.total_hours_alternative_training  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.total_hours_alternative_training }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Nombre d'entraînements de musculation</Label>
                                                    <Input
                                                        name="nr_strength_trainings"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.nr_strength_trainings  || ""}
                                                        invalid={
                                                            validation.touched.nr_strength_trainings  && validation.errors.nr_strength_trainings 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.nr_strength_trainings  && validation.errors.nr_strength_trainings  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.nr_strength_trainings }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Effort maximal</Label>
                                                    <Input
                                                        name="max_exertion"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.max_exertion  || ""}
                                                        invalid={
                                                            validation.touched.max_exertion  && validation.errors.max_exertion 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.max_exertion  && validation.errors.max_exertion  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.max_exertion }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Succès d'entraînement maximal</Label>
                                                    <Input
                                                        name="max_training_success"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.max_training_success  || ""}
                                                        invalid={
                                                            validation.touched.max_training_success  && validation.errors.max_training_success 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.max_training_success  && validation.errors.max_training_success  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.max_training_success }
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <Label className="form-label">Récupération maximale</Label>
                                                    <Input
                                                        name="max_recovery"
                                                        className="form-control"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.max_recovery  || ""}
                                                        invalid={
                                                            validation.touched.max_recovery  && validation.errors.max_recovery 
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.max_recovery  && validation.errors.max_recovery  ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.max_recovery }
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
        <Modal isOpen={modal} toggle={toggle} size="xl">
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
        <h4 className='my-2 text-center'>Importance des caractéristiques</h4>
        {featureImportance && <div className="text-center">
          <ReactApexChart 
            options={chartOptions} 
            series={series} 
            type="pie" 
            height={350} 
            className='mt-3'
          />
        </div>}
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

export default BoxeBlessure