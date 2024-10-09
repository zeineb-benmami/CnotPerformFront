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
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from "reactstrap";
import { useFormik } from 'formik';
import predictionIcon from "../../../assets/images/icon/prediction.png";
import axios from 'axios'; // Import axios for making API requests
import { taekwondoPerformPrediction } from '../../../service/aiService';
import { data } from 'autoprefixer';

function TaekwondoPerformance() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [result, setResult] = useState(null);
    
    // Initial values for the form
    const initialValues = {
        Sex: '',
        Age: '',
        Height: '',
        Weight: '',
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
            Sex: Yup.string().required('Le sexe est obligatoire'),
            Age: Yup.number().required('L\'âge est obligatoire').positive().integer(),
            Height: Yup.number().required('La taille est obligatoire').positive(),
            Weight: Yup.number().required('Le poids est obligatoire').positive(),
            weightClass: Yup.string().required('La catégorie de poids est obligatoire'),
            pointsScored: Yup.number().required('Les points marqués sont obligatoires').positive().integer(),
            techniquePoints: Yup.number().required('Les points techniques sont obligatoires').positive().integer(),
            nutritionQualityScore: Yup.number().required('Le score de qualité nutritionnelle est obligatoire').min(1).max(10),
            sleepHours: Yup.number().required('Les heures de sommeil sont obligatoires').positive(),
            injuryHistory: Yup.number().required('L\'historique des blessures est obligatoire').oneOf([0, 1], 'Doit être 0 ou 1')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const data ={
                    Sex : values.Sex,
                    Age : values.Age,
                    Weight: values.Weight,
                    Height : values.Height,
                    "Weight Class": values.weightClass,
                    "Points Scored": values.pointsScored,
                    "Technique Points": values.techniquePoints,
                    "Nutrition Quality Score": values.nutritionQualityScore,
                    "Sleep Hours": values.sleepHours,
                    "Injury History": values.injuryHistory
                }
                const response = await taekwondoPerformPrediction(data);
                setResult(response.data.prediction); // Assuming prediction returns a numerical value
                toggle();
                resetForm();
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
                                                    name="Sex"
                                                    type="select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.Sex || ""}
                                                    invalid={validation.touched.Sex && validation.errors.Sex}
                                                >
                                                    <option value="">Sélectionnez</option>
                                                    <option value="Male">Masculin</option>
                                                    <option value="Female">Féminin</option>
                                                </Input>
                                                <FormFeedback>{validation.errors.Sex}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Âge</Label>
                                                <Input
                                                    name="Age"
                                                    className="form-control"
                                                    placeholder="Entrer l'âge"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.Age || ""}
                                                    invalid={validation.touched.Age && validation.errors.Age ? true : false}
                                                />
                                                {validation.touched.Age && validation.errors.Age ? (
                                                    <FormFeedback type="invalid">{validation.errors.Age}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Taille (en mètres)</Label>
                                                <Input
                                                    name="Height"
                                                    className="form-control"
                                                    placeholder="Entrer la taille"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.Height || ""}
                                                    invalid={validation.touched.Height && validation.errors.Height ? true : false}
                                                />
                                                {validation.touched.Height && validation.errors.Height ? (
                                                    <FormFeedback type="invalid">{validation.errors.Height}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Poids (en kg)</Label>
                                                <Input
                                                    name="Weight"
                                                    className="form-control"
                                                    placeholder="Entrer le poids"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.Weight || ""}
                                                    invalid={validation.touched.Weight && validation.errors.Weight ? true : false}
                                                />
                                                {validation.touched.Weight && validation.errors.Weight ? (
                                                    <FormFeedback type="invalid">{validation.errors.Weight}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Catégorie de Poids</Label>
                                                <Input
                                                    name="weightClass"
                                                    className="form-control"
                                                    placeholder="Entrer la catégorie de poids"
                                                    type="select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.weightClass || ""}
                                                    invalid={validation.touched.weightClass && validation.errors.weightClass ? true : false}
                                                >
                                                    <option value="">Sélectionnez</option>
                                                    <option value="Finweight">Poids fin</option>
                                                    <option value="Lightweight">Poids Léger</option>
                                                    <option value="Welterweight">Poids welter</option>
                                                    <option value="Featherweight">Poids plume</option>
                                                    <option value="Heavyweight">Poids lourd</option>
                                                </Input>
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
                                                <Label className="form-label">Historique des Blessures (1 Mineur : 2 grave pour blessure, 0 pour aucune blessure)</Label>
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

export default TaekwondoPerformance;
