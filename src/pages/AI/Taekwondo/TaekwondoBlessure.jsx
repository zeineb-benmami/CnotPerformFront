import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
} from "reactstrap";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import blessureIcon from "../../../assets/images/icon/blessure.png";
import axios from 'axios';

function TaekwondoBlessure() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [predictionResult, setPredictionResult] = useState(null);

    const initialValues = {
        sport: 'Taekwondo', // Static value for sport
        nr_sessions: '',
        nr_rest_days: '',
        total_hours_training: '',
        max_hours_one_day: '',
        total_hours_high_intensity: '',
        nr_tough_sessions: '',
        nr_days_with_interval_session: '',
        total_hours_moderate_intensity: '',
        max_hours_moderate_intensity_one_day: '',
        max_hours_high_intensity_one_day: '',
        total_hours_alternative_training: '',
        nr_strength_trainings: '',
        avg_exertion: '',
        min_exertion: '',
        max_exertion: '',
        avg_training_success: '',
        min_training_success: '',
        max_training_success: '',
        avg_recovery: '',
        min_recovery: '',
        max_recovery: ''
    };

    const validation = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            sport: Yup.string().required('Sport is required'),
            nr_sessions: Yup.number()
                .required('Number of sessions is required')
                .min(1, 'Must be at least 1'),
            nr_rest_days: Yup.number()
                .required('Number of rest days is required')
                .min(0, 'Cannot be negative'),
            total_hours_training: Yup.number()
                .required('Total hours of training is required')
                .min(0, 'Cannot be negative'),
            max_hours_one_day: Yup.number()
                .required('Max hours in one day is required')
                .min(0, 'Cannot be negative'),
            total_hours_high_intensity: Yup.number()
                .required('Total hours of high intensity training is required')
                .min(0, 'Cannot be negative'),
            nr_tough_sessions: Yup.number()
                .required('Number of tough sessions is required')
                .min(0, 'Cannot be negative'),
            nr_days_with_interval_session: Yup.number()
                .required('Days with interval sessions is required')
                .min(0, 'Cannot be negative'),
            total_hours_moderate_intensity: Yup.number()
                .required('Total hours of moderate intensity training is required')
                .min(0, 'Cannot be negative'),
            max_hours_moderate_intensity_one_day: Yup.number()
                .required('Max hours of moderate intensity in one day is required')
                .min(0, 'Cannot be negative'),
            max_hours_high_intensity_one_day: Yup.number()
                .required('Max hours of high intensity in one day is required')
                .min(0, 'Cannot be negative'),
            total_hours_alternative_training: Yup.number()
                .required('Total hours of alternative training is required')
                .min(0, 'Cannot be negative'),
            nr_strength_trainings: Yup.number()
                .required('Number of strength training sessions is required')
                .min(0, 'Cannot be negative'),
            avg_exertion: Yup.number()
                .required('Average exertion is required')
                .min(0, 'Cannot be negative'),
            min_exertion: Yup.number()
                .required('Minimum exertion is required')
                .min(0, 'Cannot be negative'),
            max_exertion: Yup.number()
                .required('Maximum exertion is required')
                .min(0, 'Cannot be negative'),
            avg_training_success: Yup.number()
                .required('Average training success is required')
                .min(0, 'Cannot be negative'),
            min_training_success: Yup.number()
                .required('Minimum training success is required')
                .min(0, 'Cannot be negative'),
            max_training_success: Yup.number()
                .required('Maximum training success is required')
                .min(0, 'Cannot be negative'),
            avg_recovery: Yup.number()
                .required('Average recovery is required')
                .min(0, 'Cannot be negative'),
            min_recovery: Yup.number()
                .required('Minimum recovery is required')
                .min(0, 'Cannot be negative'),
            max_recovery: Yup.number()
                .required('Maximum recovery is required')
                .min(0, 'Cannot be negative'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post("http://localhost:5000/predictInjuryTaekwondo", {
                    features: [
                        values.sport,
                        values.nr_sessions,
                        values.nr_rest_days,
                        values.total_hours_training,
                        values.max_hours_one_day,
                        values.total_hours_high_intensity,
                        values.nr_tough_sessions,
                        values.nr_days_with_interval_session,
                        values.total_hours_moderate_intensity,
                        values.max_hours_moderate_intensity_one_day,
                        values.max_hours_high_intensity_one_day,
                        values.total_hours_alternative_training,
                        values.nr_strength_trainings,
                        values.avg_exertion,
                        values.min_exertion,
                        values.max_exertion,
                        values.avg_training_success,
                        values.min_training_success,
                        values.max_training_success,
                        values.avg_recovery,
                        values.min_recovery,
                        values.max_recovery,
                    ]
                });
                
                setPredictionResult(response.data.prediction); // Set prediction result from API response
            } catch (error) {
                console.error('Submission error:', error);
            }
        }
    });

    return (
        <React.Fragment>
            <section className="section hero-section mt-5" id="home">
                <Container className='mt-5'>
                    <Row className="justify-content-center">
                        <Col md={12}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Taekwondo</h5>
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
                                                <Label className="form-label">Sport</Label>
                                                <Input
                                                    name="sport"
                                                    className="form-control"
                                                    type="text"
                                                    value={validation.values.sport}
                                                    readOnly // Read-only since it's static
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Nombre de sessions</Label>
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
                                                <Label className="form-label">Nombre de jours de repos</Label>
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
                                                <Label className="form-label">Total des heures d'entraînement</Label>
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
                                                <Label className="form-label">Maximum des heures en une journée</Label>
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
                                                <Label className="form-label">Heures Totales d'Entraînement de Haute Intensité</Label>
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
                                                <Label className="form-label">Nombre de Séances Difficiles</Label>
                                                <Input
                                                    name="nr_tough_sessions"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nr_tough_sessions || ""}
                                                    invalid={
                                                        validation.touched.nr_tough_sessions && validation.errors.nr_tough_sessions
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.nr_tough_sessions && validation.errors.nr_tough_sessions ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.nr_tough_sessions}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Jours avec Séances d'Intervalle</Label>
                                                <Input
                                                    name="nr_days_with_interval_session"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nr_days_with_interval_session || ""}
                                                    invalid={
                                                        validation.touched.nr_days_with_interval_session && validation.errors.nr_days_with_interval_session
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.nr_days_with_interval_session && validation.errors.nr_days_with_interval_session ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.nr_days_with_interval_session}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label"> Heures Totales d'Entraînement de Intensité Modérée</Label>
                                                <Input
                                                    name="total_hours_moderate_intensity"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.total_hours_moderate_intensity || ""}
                                                    invalid={
                                                        validation.touched.total_hours_moderate_intensity && validation.errors.total_hours_moderate_intensity
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.total_hours_moderate_intensity && validation.errors.total_hours_moderate_intensity ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.total_hours_moderate_intensity}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Max Heures d'Intensité Modérée en Une Journée</Label>
                                                <Input
                                                    name="max_hours_moderate_intensity_one_day"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.max_hours_moderate_intensity_one_day || ""}
                                                    invalid={
                                                        validation.touched.max_hours_moderate_intensity_one_day && validation.errors.max_hours_moderate_intensity_one_day
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.max_hours_moderate_intensity_one_day && validation.errors.max_hours_moderate_intensity_one_day ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.max_hours_moderate_intensity_one_day}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Max Heures d'Intensité Élevée en Une Journée</Label>
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
                                                <Label className="form-label">Heures Totales d'Entraînement Alternatif</Label>
                                                <Input
                                                    name="total_hours_alternative_training"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.total_hours_alternative_training || ""}
                                                    invalid={
                                                        validation.touched.total_hours_alternative_training && validation.errors.total_hours_alternative_training
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.total_hours_alternative_training && validation.errors.total_hours_alternative_training ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.total_hours_alternative_training}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Nombre de Séances d'Entraînement de Force</Label>
                                                <Input
                                                    name="nr_strength_trainings"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nr_strength_trainings || ""}
                                                    invalid={
                                                        validation.touched.nr_strength_trainings && validation.errors.nr_strength_trainings
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.nr_strength_trainings && validation.errors.nr_strength_trainings ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.nr_strength_trainings}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Effort Moyen</Label>
                                                <Input
                                                    name="avg_exertion"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.avg_exertion || ""}
                                                    invalid={
                                                        validation.touched.avg_exertion && validation.errors.avg_exertion
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.avg_exertion && validation.errors.avg_exertion ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.avg_exertion}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Effort Minimum</Label>
                                                <Input
                                                    name="min_exertion"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.min_exertion || ""}
                                                    invalid={
                                                        validation.touched.min_exertion && validation.errors.min_exertion
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.min_exertion && validation.errors.min_exertion ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.min_exertion}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Effort Maximum</Label>
                                                <Input
                                                    name="max_exertion"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.max_exertion || ""}
                                                    invalid={
                                                        validation.touched.max_exertion && validation.errors.max_exertion
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.max_exertion && validation.errors.max_exertion ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.max_exertion}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label"> Succès d'Entraînement Moyen</Label>
                                                <Input
                                                    name="avg_training_success"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.avg_training_success || ""}
                                                    invalid={
                                                        validation.touched.avg_training_success && validation.errors.avg_training_success
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.avg_training_success && validation.errors.avg_training_success ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.avg_training_success}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Succès d'Entraînement Minimum</Label>
                                                <Input
                                                    name="min_training_success"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.min_training_success || ""}
                                                    invalid={
                                                        validation.touched.min_training_success && validation.errors.min_training_success
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.min_training_success && validation.errors.min_training_success ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.min_training_success}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Succès d'Entraînement Maximum</Label>
                                                <Input
                                                    name="max_training_success"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.max_training_success || ""}
                                                    invalid={
                                                        validation.touched.max_training_success && validation.errors.max_training_success
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.max_training_success && validation.errors.max_training_success ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.max_training_success}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Récupération Moyenne</Label>
                                                <Input
                                                    name="avg_recovery"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.avg_recovery || ""}
                                                    invalid={
                                                        validation.touched.avg_recovery && validation.errors.avg_recovery
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.avg_recovery && validation.errors.avg_recovery ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.avg_recovery}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Récupération Minimum</Label>
                                                <Input
                                                    name="min_recovery"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.min_recovery || ""}
                                                    invalid={
                                                        validation.touched.min_recovery && validation.errors.min_recovery
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.min_recovery && validation.errors.min_recovery ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.min_recovery}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Récupération Maximum</Label>
                                                <Input
                                                    name="max_recovery"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.max_recovery || ""}
                                                    invalid={
                                                        validation.touched.max_recovery && validation.errors.max_recovery
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                {validation.touched.max_recovery && validation.errors.max_recovery ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.max_recovery}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-100"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                            {predictionResult && <div className="alert alert-info">{predictionResult}</div>}
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}

export default TaekwondoBlessure;
