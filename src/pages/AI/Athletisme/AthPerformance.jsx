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
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import predictionIcon from "../../../assets/images/icon/prediction.png";
import DatePicker from "react-datepicker"; // Assurez-vous que react-datepicker est installé
import "react-datepicker/dist/react-datepicker.css"; // Importez le style du datepicker
import axios from 'axios';
import { athletismePerformPrediction } from '../../../service/aiService';

function AthPerformance() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [result, setResult] = useState(null);

    const [initialValues, setInitialValues] = useState({
        age: '',
        sex: '',
        height: '',
        weight: '',
        country: '',
        date_of_last_competition:new Date(),
        nutrition_quality_score: '',
        average_sleep_hours: '',
        injury_history: '',
        result_100m: '',
        result_200m: '',
        result_400m: '',
        result_long_jump: '',
        result_high_jump: '',
        result_shot_put: '',
    });

    const validation = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            age: Yup.number().required('L\'âge est obligatoire').min(1, 'L\'âge doit être supérieur à 0'),
            sex: Yup.string().required('Le sexe est obligatoire'),
            height: Yup.number().required('La taille est obligatoire').min(1, 'La taille doit être supérieure à 0'),
            weight: Yup.number().required('Le poids est obligatoire').min(1, 'Le poids doit être supérieur à 0'),
            country: Yup.string().required('Le pays est obligatoire'),
            nutrition_quality_score: Yup.number().required('Le score nutritionnel est obligatoire').min(0).max(10),
            average_sleep_hours: Yup.number().required('Le nombre d\'heures de sommeil est obligatoire').min(0),
            injury_history: Yup.number().required('L\'historique des blessures est obligatoire').oneOf([0, 1]),
            result_100m: Yup.number().required('Le résultat 100m est obligatoire'),
            result_200m: Yup.number().required('Le résultat 200m est obligatoire'),
            result_400m: Yup.number().required('Le résultat 400m est obligatoire'),
            result_long_jump: Yup.number().required('Le saut en longueur est obligatoire'),
            result_high_jump: Yup.number().required('Le saut en hauteur est obligatoire'),
            result_shot_put: Yup.number().required('Le lancer de poids est obligatoire'),
        }),
        onSubmit: async (values) => {
            try {
                const dateObj = new Date(values.date_of_last_competition);
                const dateInt = parseInt(
                    dateObj.getFullYear().toString() +
                    (dateObj.getMonth() + 1).toString().padStart(2, '0') +
                    dateObj.getDate().toString().padStart(2, '0')
                  );
                  values.date_of_last_competition = dateInt;
                  values.country = 1;
                  
                // API call to predict performance
                const response = await athletismePerformPrediction(values)
                setResult(response.data.prediction); // Display the prediction message
                toggle();
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
                        <Col md={12} lg={12} xl={12}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Athletisme</h5>
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
                                            {/* Add input fields for each of the required parameters */}
                                            <div className="mb-3">
                                                <Label className="form-label">Âge</Label>
                                                <Input
                                                    name="age"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.age || ""}
                                                    invalid={validation.touched.age && validation.errors.age}
                                                />
                                                <FormFeedback>{validation.errors.age}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Sexe</Label>
                                                <Input
                                                    name="sex"
                                                    type="select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.sex || ""}
                                                    invalid={validation.touched.sex && validation.errors.sex}
                                                >
                                                    <option value="">Sélectionnez</option>
                                                    <option value="0">Masculin</option>
                                                    <option value="1">Féminin</option>
                                                </Input>
                                                <FormFeedback>{validation.errors.sex}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Taille (cm)</Label>
                                                <Input
                                                    name="height"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.height || ""}
                                                    invalid={validation.touched.height && validation.errors.height}
                                                />
                                                <FormFeedback>{validation.errors.height}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Poids (kg)</Label>
                                                <Input
                                                    name="weight"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.weight || ""}
                                                    invalid={validation.touched.weight && validation.errors.weight}
                                                />
                                                <FormFeedback>{validation.errors.weight}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Pays</Label>
                                                <Input
                                                    name="country"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.country || ""}
                                                    invalid={validation.touched.country && validation.errors.country}
                                                />
                                                <FormFeedback>{validation.errors.country}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Date de la Dernière Compétition</Label>
                                                <DatePicker
                                                    selected={validation.values.date_of_last_competition}
                                                    onChange={(date_of_last_competition) => validation.setFieldValue('date_of_last_competition', date_of_last_competition)}
                                                    className={`form-control ${validation.touched.date_of_last_competition && validation.errors.date_of_last_competition ? 'is-invalid' : ''}`}
                                                    onBlur={validation.handleBlur}
                                                />
                                                {validation.touched.date_of_last_competition && validation.errors.date_of_last_competition ? (
                                                    <FormFeedback>{validation.errors.date_of_last_competition}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Score de Qualité Nutritionnelle</Label>
                                                <Input
                                                    name="nutrition_quality_score"
                                                    type="number"
                                                    min="0"
                                                    max="10"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.nutrition_quality_score || ""}
                                                    invalid={validation.touched.nutrition_quality_score && validation.errors.nutrition_quality_score}
                                                />
                                                <FormFeedback>{validation.errors.nutrition_quality_score}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Heures de Sommeil</Label>
                                                <Input
                                                    name="average_sleep_hours"
                                                    type="number"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.average_sleep_hours || ""}
                                                    invalid={validation.touched.average_sleep_hours && validation.errors.average_sleep_hours}
                                                />
                                                <FormFeedback>{validation.errors.average_sleep_hours}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Historique des Blessures</Label>
                                                <Input
                                                    name="injury_history"
                                                    type="select"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.injury_history || ""}
                                                    invalid={validation.touched.injury_history && validation.errors.injury_history}
                                                >
                                                    <option value="">Sélectionnez</option>
                                                    <option value="0">Aucun</option>
                                                    <option value="1">Oui</option>
                                                </Input>
                                                <FormFeedback>{validation.errors.injury_history}</FormFeedback>
                                            </div>

                                            {/* Add input fields for the results of different events */}
                                            <div className="mb-3">
                                                <Label className="form-label">Résultat 100m (s)</Label>
                                                <Input
                                                    name="result_100m"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.result_100m || ""}
                                                    invalid={validation.touched.result_100m && validation.errors.result_100m}
                                                />
                                                <FormFeedback>{validation.errors.result_100m}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Résultat 200m (s)</Label>
                                                <Input
                                                    name="result_200m"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.result_200m || ""}
                                                    invalid={validation.touched.result_200m && validation.errors.result_200m}
                                                />
                                                <FormFeedback>{validation.errors.result_200m}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Résultat 400m (s)</Label>
                                                <Input
                                                    name="result_400m"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.result_400m || ""}
                                                    invalid={validation.touched.result_400m && validation.errors.result_400m}
                                                />
                                                <FormFeedback>{validation.errors.result_400m}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Résultat Saut en Longueur (m)</Label>
                                                <Input
                                                    name="result_long_jump"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.result_long_jump || ""}
                                                    invalid={validation.touched.result_long_jump && validation.errors.result_long_jump}
                                                />
                                                <FormFeedback>{validation.errors.result_long_jump}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Résultat Saut en Hauteur (m)</Label>
                                                <Input
                                                    name="result_high_jump"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.result_high_jump || ""}
                                                    invalid={validation.touched.result_high_jump && validation.errors.result_high_jump}
                                                />
                                                <FormFeedback>{validation.errors.result_high_jump}</FormFeedback>
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Résultat Lancer de Poids (m)</Label>
                                                <Input
                                                    name="result_shot_put"
                                                    type="number"
                                                    step="0.01"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.result_shot_put || ""}
                                                    invalid={validation.touched.result_shot_put && validation.errors.result_shot_put}
                                                />
                                                <FormFeedback>{validation.errors.result_shot_put}</FormFeedback>
                                            </div>

                                            <div className="mt-4 d-grid">
                                                <button className="btn btn-primary btn-block" type="submit">
                                                    Prédire la performance
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

export default AthPerformance;
