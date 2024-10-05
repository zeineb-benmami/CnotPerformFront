import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { useFormik } from 'formik';
import predictionIcon from "../../../assets/images/icon/prediction.png";
import axios from 'axios'; // Import axios for making API requests

function TaekwondoPerformance() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Initial values for the form
    const initialValues = {
        sex: '',
        age: '',
        height: '',
        weight: '',
        weightClass: '',
        pointsScored: '',
        techniquePoints: '',
        nutritionQualityScore: '',
        sleepHours: '',
        injuryHistory: ''
    };

    // Form validation using Yup
    const validation = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            sex: Yup.string().required('Le sexe est obligatoire'),
            age: Yup.number().required('L\'âge est obligatoire').positive().integer(),
            height: Yup.number().required('La taille est obligatoire').positive(),
            weight: Yup.number().required('Le poids est obligatoire').positive(),
            weightClass: Yup.string().required('La catégorie de poids est obligatoire'),
            pointsScored: Yup.number().required('Les points marqués sont obligatoires').positive().integer(),
            techniquePoints: Yup.number().required('Les points techniques sont obligatoires').positive().integer(),
            nutritionQualityScore: Yup.number().required('Le score de qualité nutritionnelle est obligatoire').min(1).max(10),
            sleepHours: Yup.number().required('Les heures de sommeil sont obligatoires').positive(),
            injuryHistory: Yup.number().required('L\'historique des blessures est obligatoire').oneOf([0, 1], 'Doit être 0 ou 1')
        }),
        onSubmit: async (values) => {
            try {
                // Prepare the data for API consumption
                const data = {
                    features: [
                        values.sex,
                        values.age,
                        values.height,
                        values.weight,
                        values.weightClass,
                        values.pointsScored,
                        values.techniquePoints,
                        values.nutritionQualityScore,
                        values.sleepHours,
                        values.injuryHistory
                    ]
                };

                // Make the API call
                const response = await axios.post("http://localhost:5000/predictPerformanceTaekwondo", data);
                
                // Handle the response (for example, navigate or show a message)
                console.log('Prediction Response:', response.data);
                alert(`Prediction Result: ${response.data.prediction ? 'Medal' : 'No Medal'}`);
                
                // Navigate or perform other actions based on the response
                navigate('/mybourses');
            } catch (error) {
                console.error('Submission error:', error);
                alert('Erreur lors de la soumission des données.');
            }
        }
    });

    return (
        <React.Fragment>
            <section className="section hero-section mt-5" id="home">
                <Container className='mt-5'>
                    <Row className="justify-content-center">
                        <Col md={12} lg={12} xl={12}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Athlétisme</h5>
                                                <p>Prédiction de Performance</p>
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
                                                        src={predictionIcon}
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
                                                <Label className="form-label">Sexe</Label>
                                                <Input
                                                    name="sex"
                                                    className="form-control"
                                                    placeholder="Entrer le sexe (Male/Female)"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.sex || ""}
                                                    invalid={validation.touched.sex && validation.errors.sex ? true : false}
                                                />
                                                {validation.touched.sex && validation.errors.sex ? (
                                                    <FormFeedback type="invalid">{validation.errors.sex}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Âge</Label>
                                                <Input
                                                    name="age"
                                                    className="form-control"
                                                    placeholder="Entrer l'âge"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.age || ""}
                                                    invalid={validation.touched.age && validation.errors.age ? true : false}
                                                />
                                                {validation.touched.age && validation.errors.age ? (
                                                    <FormFeedback type="invalid">{validation.errors.age}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Taille (en mètres)</Label>
                                                <Input
                                                    name="height"
                                                    className="form-control"
                                                    placeholder="Entrer la taille"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.height || ""}
                                                    invalid={validation.touched.height && validation.errors.height ? true : false}
                                                />
                                                {validation.touched.height && validation.errors.height ? (
                                                    <FormFeedback type="invalid">{validation.errors.height}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Poids (en kg)</Label>
                                                <Input
                                                    name="weight"
                                                    className="form-control"
                                                    placeholder="Entrer le poids"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.weight || ""}
                                                    invalid={validation.touched.weight && validation.errors.weight ? true : false}
                                                />
                                                {validation.touched.weight && validation.errors.weight ? (
                                                    <FormFeedback type="invalid">{validation.errors.weight}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Catégorie de Poids</Label>
                                                <Input
                                                    name="weightClass"
                                                    className="form-control"
                                                    placeholder="Entrer la catégorie de poids"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.weightClass || ""}
                                                    invalid={validation.touched.weightClass && validation.errors.weightClass ? true : false}
                                                />
                                                {validation.touched.weightClass && validation.errors.weightClass ? (
                                                    <FormFeedback type="invalid">{validation.errors.weightClass}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Points Marqués</Label>
                                                <Input
                                                    name="pointsScored"
                                                    className="form-control"
                                                    placeholder="Entrer les points marqués"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.pointsScored || ""}
                                                    invalid={validation.touched.pointsScored && validation.errors.pointsScored ? true : false}
                                                />
                                                {validation.touched.pointsScored && validation.errors.pointsScored ? (
                                                    <FormFeedback type="invalid">{validation.errors.pointsScored}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Points Techniques</Label>
                                                <Input
                                                    name="techniquePoints"
                                                    className="form-control"
                                                    placeholder="Entrer les points techniques"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.techniquePoints || ""}
                                                    invalid={validation.touched.techniquePoints && validation.errors.techniquePoints ? true : false}
                                                />
                                                {validation.touched.techniquePoints && validation.errors.techniquePoints ? (
                                                    <FormFeedback type="invalid">{validation.errors.techniquePoints}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Score de Qualité Nutritionnelle (1-10)</Label>
                                                <Input
                                                    name="nutritionQualityScore"
                                                    className="form-control"
                                                    placeholder="Entrer le score de qualité nutritionnelle"
                                                    type="number"
                                                    min="1"
                                                    max="10"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nutritionQualityScore || ""}
                                                    invalid={validation.touched.nutritionQualityScore && validation.errors.nutritionQualityScore ? true : false}
                                                />
                                                {validation.touched.nutritionQualityScore && validation.errors.nutritionQualityScore ? (
                                                    <FormFeedback type="invalid">{validation.errors.nutritionQualityScore}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Heures de Sommeil</Label>
                                                <Input
                                                    name="sleepHours"
                                                    className="form-control"
                                                    placeholder="Entrer les heures de sommeil"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.sleepHours || ""}
                                                    invalid={validation.touched.sleepHours && validation.errors.sleepHours ? true : false}
                                                />
                                                {validation.touched.sleepHours && validation.errors.sleepHours ? (
                                                    <FormFeedback type="invalid">{validation.errors.sleepHours}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Historique des Blessures (0 ou 1)</Label>
                                                <Input
                                                    name="injuryHistory"
                                                    className="form-control"
                                                    placeholder="Entrer l'historique des blessures"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.injuryHistory || ""}
                                                    invalid={validation.touched.injuryHistory && validation.errors.injuryHistory ? true : false}
                                                />
                                                {validation.touched.injuryHistory && validation.errors.injuryHistory ? (
                                                    <FormFeedback type="invalid">{validation.errors.injuryHistory}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mt-4 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    type="submit"
                                                >
                                                    Prédire la Performance
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
        </React.Fragment>
    );
}

export default TaekwondoPerformance;
