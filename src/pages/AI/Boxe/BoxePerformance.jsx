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
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Select from 'react-select';
import predictionIcon from "../../../assets/images/icon/prediction.png";
import { getRoleFName } from '../../../service/apiUser';
import DatePicker from "react-datepicker";
import { addBourse, editBourse, getBoursebyId } from '../../../service/bourseService';
import axios from 'axios';
import { boxPerformPrediction } from '../../../service/aiService';

function BoxePerformance() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [result, setResult] = useState(null);

    // Enum options
    const enumSex = { Female: 'Female', Male: 'Male' };
    const enumWeightClass = { Lightweight: 'Lightweight', Heavyweight: 'Heavyweight', Middleweight: 'Middleweight' };
    const enumMatchOutcome = { Loss: 'Loss', Draw: 'Draw', Win: 'Win' };
    const enumInjuryHistory = { No: 'No', Minor: 'Minor', Moderate: 'Moderate', Severe: 'Severe' };

    // Convert enum to Select options
    const createOptions = (enumObj) => Object.keys(enumObj).map(key => ({ label: key, value: enumObj[key] }));

    const sexOptions = createOptions(enumSex);
    const weightClassOptions = createOptions(enumWeightClass);
    const matchOutcomeOptions = createOptions(enumMatchOutcome);
    const injuryHistoryOptions = createOptions(enumInjuryHistory);

    // Formik form handling
    const validation = useFormik({
        initialValues: {
            Sex: '',
            Age: '',
            Height: '',
            Weight: '',
            WeightClass: '',
            MatchOutcome: '',
            RoundsFought: '',
            PunchesThrown: '',
            NutritionQualityScore: '',
            SleepHours: '',
            InjuryHistory: '',
            PunchesLanded: ''
        },
        validationSchema: Yup.object().shape({
            Sex: Yup.string().oneOf(Object.values(enumSex)).required('Sex is required'),
            Age: Yup.number().required('Age is required'),
            Height: Yup.number().required('Height is required'),
            Weight: Yup.number().required('Weight is required'),
            WeightClass: Yup.string().oneOf(Object.values(enumWeightClass)).required('Weight Class is required'),
            MatchOutcome: Yup.string().oneOf(Object.values(enumMatchOutcome)).required('Match Outcome is required'),
            RoundsFought: Yup.number().integer().required('Rounds Fought is required'),
            PunchesThrown: Yup.number().integer().required('Punches Thrown is required'),
            NutritionQualityScore: Yup.number().min(0).max(10).required('Nutrition Quality Score must be between 0 and 10'),
            SleepHours: Yup.number().required('Sleep Hours is required'),
            InjuryHistory: Yup.string().oneOf(Object.values(enumInjuryHistory)).required('Injury History is required'),
            PunchesLanded: Yup.number().integer().required('Punches Landed is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {              
                const data = {
                    Sex: values.Sex,
                    Age: values.Age,
                    Height: values.Height,
                    Weight: values.Weight,
                    'Weight Class': values.WeightClass,
                    'Match Outcome': values.MatchOutcome,
                    'Rounds Fought': values.RoundsFought,
                    'Punches Thrown': values.PunchesThrown,
                    'Nutrition Quality Score': values.NutritionQualityScore,
                    'Sleep Hours': values.SleepHours,
                    'Injury History': values.InjuryHistory,
                    'Punches Landed': values.PunchesLanded
                };
                                // Call the API
                                const response = await boxPerformPrediction(data);                                
                                setResult(response.data.prediction);
                                toggle();
                                resetForm();
                
            } catch (error) {
                console.error('Submission error:', error);
            }
        }
    });

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            height: 'calc(1.5em + 0.75rem + 2px)',
            minHeight: 'calc(1.5em + 0.75rem + 2px)',
        })
    };

    const handleSelectChange = (field, option) => {
        validation.setFieldValue(field, option ? option.value : '');
    };


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
                                                    <h5 className="text-primary">Boxe</h5>
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
                                                <Select
                                                    name="Sex"
                                                    options={sexOptions}
                                                    styles={customSelectStyles}
                                                    className='text-dark'
                                                    onChange={(option) => handleSelectChange('Sex', option)}
                                                    value={sexOptions.find(option => option.value === validation.values.Sex)}
                                                    isClearable
                                                />
                                                {validation.errors.Sex && validation.touched.Sex ? (
                                                    <FormFeedback type="invalid" className="d-block">
                                                        {validation.errors.Sex}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Âge</Label>
                                                <Input
                                                    name="Age"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.Age || ""}
                                                    invalid={validation.touched.Age && validation.errors.Age}
                                                />
                                                {validation.touched.Age && validation.errors.Age ? (
                                                    <FormFeedback>{validation.errors.Age}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Taille</Label>
                                                <Input
                                                    name="Height"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.Height || ""}
                                                    invalid={validation.touched.Height && validation.errors.Height}
                                                />
                                                {validation.touched.Height && validation.errors.Height ? (
                                                    <FormFeedback>{validation.errors.Height}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Poids</Label>
                                                <Input
                                                    name="Weight"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.Weight || ""}
                                                    invalid={validation.touched.Weight && validation.errors.Weight}
                                                />
                                                {validation.touched.Weight && validation.errors.Weight ? (
                                                    <FormFeedback>{validation.errors.Weight}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Catégorie de poids</Label>
                                                <Select
                                                    name="WeightClass"
                                                    options={weightClassOptions}
                                                    styles={customSelectStyles}
                                                    className='text-dark'
                                                    onChange={(option) => handleSelectChange('WeightClass', option)}
                                                    value={weightClassOptions.find(option => option.value === validation.values.WeightClass)}
                                                    isClearable
                                                />
                                                {validation.errors.WeightClass && validation.touched.WeightClass ? (
                                                    <FormFeedback type="invalid" className="d-block">
                                                        {validation.errors.WeightClass}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Résultat du match</Label>
                                                <Select
                                                    name="MatchOutcome"
                                                    options={matchOutcomeOptions}
                                                    styles={customSelectStyles}
                                                    className='text-dark'
                                                    onChange={(option) => handleSelectChange('MatchOutcome', option)}
                                                    value={matchOutcomeOptions.find(option => option.value === validation.values.MatchOutcome)}
                                                    isClearable
                                                />
                                                {validation.errors.MatchOutcome && validation.touched.MatchOutcome ? (
                                                    <FormFeedback type="invalid" className="d-block">
                                                        {validation.errors.MatchOutcome}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Rounds combattus</Label>
                                                <Input
                                                    name="RoundsFought"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.RoundsFought || ""}
                                                    invalid={validation.touched.RoundsFought && validation.errors.RoundsFought}
                                                />
                                                {validation.touched.RoundsFought && validation.errors.RoundsFought ? (
                                                    <FormFeedback>{validation.errors.RoundsFought}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Coups lancés</Label>
                                                <Input
                                                    name="PunchesThrown"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.PunchesThrown || ""}
                                                    invalid={validation.touched.PunchesThrown && validation.errors.PunchesThrown}
                                                />
                                                {validation.touched.PunchesThrown && validation.errors.PunchesThrown ? (
                                                    <FormFeedback>{validation.errors.PunchesThrown}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Score de qualité nutritionnelle (0-10)</Label>
                                                <Input
                                                    name="NutritionQualityScore"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.NutritionQualityScore || ""}
                                                    invalid={validation.touched.NutritionQualityScore && validation.errors.NutritionQualityScore}
                                                />
                                                {validation.touched.NutritionQualityScore && validation.errors.NutritionQualityScore ? (
                                                    <FormFeedback>{validation.errors.NutritionQualityScore}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Heures de sommeil</Label>
                                                <Input
                                                    name="SleepHours"
                                                    className="form-control"
                                                    type="number"
                                                    step="0.1"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.SleepHours || ""}
                                                    invalid={validation.touched.SleepHours && validation.errors.SleepHours}
                                                />
                                                {validation.touched.SleepHours && validation.errors.SleepHours ? (
                                                    <FormFeedback>{validation.errors.SleepHours}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Antécédents de blessures</Label>
                                                <Select
                                                    name="InjuryHistory"
                                                    options={injuryHistoryOptions}
                                                    styles={customSelectStyles}
                                                    className='text-dark'
                                                    onChange={(option) => handleSelectChange('InjuryHistory', option)}
                                                    value={injuryHistoryOptions.find(option => option.value === validation.values.InjuryHistory)}
                                                    isClearable
                                                />
                                                {validation.errors.InjuryHistory && validation.touched.InjuryHistory ? (
                                                    <FormFeedback type="invalid" className="d-block">
                                                        {validation.errors.InjuryHistory}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Coups portés</Label>
                                                <Input
                                                    name="PunchesLanded"
                                                    className="form-control"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    value={validation.values.PunchesLanded || ""}
                                                    invalid={validation.touched.PunchesLanded && validation.errors.PunchesLanded}
                                                />
                                                {validation.touched.PunchesLanded && validation.errors.PunchesLanded ? (
                                                    <FormFeedback>{validation.errors.PunchesLanded}</FormFeedback>
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
              src="https://lottie.host/embed/ead1715c-f858-47bc-8bee-72f498cebb7b/0PVav4ymMc.json" 
              className="mx-auto mb-4" 
              style={{ width: '300px', height: '300px', border: 'none' }}
              title="Animation"
            ></iframe>
            <div className="alert alert-danger rounded-3 shadow-sm">
              <h4 className="alert-heading">Désolé, vous ne gagnerez pas de médaille cette fois-ci. Mais ne vous découragez pas,</h4>
              <p className="mb-0">vos efforts constants vous mèneront au succès !</p>
            </div>
          </div>
           ) 
          : (<div className="text-center p-4">
            <iframe 
              src="https://lottie.host/embed/0cdf5268-4c54-492e-b94e-d5469ab3dc4f/HGmwar7vek.json" 
              className="mx-auto mb-4" 
              style={{ width: '300px', height: '300px', border: 'none' }}
              title="Animation"
            ></iframe>
            <div className="alert alert-success rounded-3 shadow-sm">
              <h4 className="alert-heading">Félicitations ! Vous gagnerez une médaille grâce à vos performances exceptionnelles.</h4>
              <p className="mb-0">Continuez vos efforts et vous atteindrez des sommets !</p>
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

export default BoxePerformance