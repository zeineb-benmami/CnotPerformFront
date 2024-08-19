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
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import Select from 'react-select';
import bourseIcon from "../../assets/images/icon/bourse.png";
import { addBourse } from '../../service/bourseService';
import { Chip } from 'primereact/chip';

function DemandeBourse() {
    const { bourseTitle } = useParams();
    const [documents, setDocuments] = useState([]);
    const [documentName, setDocumentName] = useState('');
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedDomaine, setSelectedDomaine] = useState('');
    const [selectedGroupe, setSelectedGroupe] = useState('');

    const enumGroupes = {
        "Universalité des jeux Olympiques": 'universalite',
        "Entourage": 'entourage',
        "Développement du sport": 'developpement',
        "Valeurs Olympiques": 'valeurs',
        "Gestion des CNO et partage de connaissances": 'capciteadministration',
    };

    const enumDomaines = {
        "Athlètes et développement du Sport": 'developpement',
        "Valeurs": 'valeurs',
        "Développement des capacités et administration": 'capciteadministration',
    };

    const navigate = useNavigate();

    const federations = [
        { value: 'F.T judo ', label: 'judo' },
    ];

    const domaineOptions = Object.keys(enumDomaines).map(key => ({
        label: key,
        value: enumDomaines[key],
    }));

    const groupeOptions = Object.keys(enumGroupes).map(key => ({
        label: key,
        value: enumGroupes[key],  // Corrected from enumDomaines to enumGroupes
    }));

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? '#2684FF' : state.selectProps.error ? '#dc3545' : base.borderColor,
            '&:hover': {
                borderColor: state.isFocused ? '#2684FF' : state.selectProps.error ? '#dc3545' : base.borderColor
            }
        })
    };

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            height: 'calc(1.5em + 0.75rem + 2px)',
            minHeight: 'calc(1.5em + 0.75rem + 2px)',
        })
    };

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption ? selectedOption.value : "");
        validation.setFieldValue("federation", selectedOption ? selectedOption.value : "");
    };

    const handleDomaineChange = (selectedOption) => {
      setSelectedDomaine(selectedOption ? selectedOption.value : "");
      validation.setFieldValue("domaine", selectedOption ? selectedOption.value : "");
  };
  
    const handleGroupeChange = (selectedOption) => {
      setSelectedGroupe(selectedOption ? selectedOption.value : "");
      validation.setFieldValue("groupe", selectedOption ? selectedOption.value : "");
  };

    const validation = useFormik({
        initialValues: {
            titre: '',
            montant: 0,
            federation: '',
            domaine: '',
            groupe: '',
            documents: [],
            description: ''
        },
        validationSchema: Yup.object().shape({
            titre: Yup.string()
                .required('Le titre est obligatoire')
                .min(2, 'Le titre doit comporter au moins 2 caractères'),
            montant: Yup.number()
                .required('Le montant est obligatoire')
                .min(1, 'Le montant doit être supérieur à 0'),
            federation: Yup.string()
                .required('La fédération est obligatoire'),
            domaine: Yup.string()
                .required('Le domaine est obligatoire'),
            groupe: Yup.string()
                .required('Le groupe est obligatoire'),
        }),
        onSubmit: async (values) => {
            try {              
                values.domaine = values.domaine;
                values.groupe = values.groupe;
                values.documents = documents;
                console.log(values);

                // Submit your form data here, e.g., using an API call
                await addBourse(values);
                // Swal.fire('Succès!', 'La bourse est ajoutée avec succès.', 'success');
                navigate('/listbourses');
            } catch (error) {
                console.error('Submission error:', error);
            }
        }
    });

    useEffect(() => {
        console.log(bourseTitle);
    }, [bourseTitle]);

    return (
        <React.Fragment>
          <section className="section hero-section bg-ico-hero" id="home">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={12} lg={12} xl={12}>
                                <Card className="overflow-hidden">
                                    <div className="bg-primary bg-soft">
                                        <Row>
                                            <Col xs={7}>
                                                <div className="text-primary p-4">
                                                    <h5 className="text-primary">Bourse</h5>
                                                    <p>Ajouter une bourse</p>
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
                                                            src={bourseIcon}
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
                                                    <Label className="form-label">titre</Label>
                                                    <Input
                                                        name="titre"
                                                        className="form-control"
                                                        placeholder="Entrer le titre"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.titre || ""}
                                                        invalid={
                                                            validation.touched.titre && validation.errors.titre
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.titre && validation.errors.titre ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.titre}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">montant</Label>
                                                    <Input
                                                        name="montant"
                                                        value={validation.values.montant}
                                                        type="number"
                                                        placeholder="Enter Password"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.montant &&
                                                            validation.errors.montant
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.montant && validation.errors.montant ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.montant}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">federation</Label>
                                                    <Select
                                                        name="federation"
                                                        options={federations}
                                                        styles={{ ...customStyles, ...customSelectStyles }}
                                                        onChange={handleRoleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={federations.find(option => option.value === validation.values.federation)}
                                                        isClearable
                                                        error={validation.touched.federation && validation.errors.federation}
                                                    />
                                                    {validation.touched.federation && validation.errors.federation ? (
                                                        <FormFeedback type="invalid" className="d-block">
                                                            {validation.errors.federation}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">domaine</Label>
                                                    <Select
                                                        name="domaine"
                                                        options={domaineOptions}
                                                        styles={{ ...customStyles, ...customSelectStyles }}
                                                        onChange={handleDomaineChange}
                                                        onBlur={validation.handleBlur}
                                                        value={domaineOptions.find(option => option.value === validation.values.domaine)}
                                                        isClearable
                                                        error={validation.touched.domaine && validation.errors.domaine}
                                                    />
                                                    {validation.touched.domaine && validation.errors.domaine ? (
                                                        <FormFeedback type="invalid" className="d-block">
                                                            {validation.errors.domaine}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">groupe</Label>
                                                    <Select
                                                        name="groupe"
                                                        options={groupeOptions}
                                                        styles={{ ...customStyles, ...customSelectStyles }}
                                                        onChange={handleGroupeChange}
                                                        onBlur={validation.handleBlur}
                                                        value={groupeOptions.find(option => option.value === validation.values.groupe)}
                                                        isClearable
                                                        error={validation.touched.groupe && validation.errors.groupe}
                                                    />
                                                    {validation.touched.groupe && validation.errors.groupe ? (
                                                        <FormFeedback type="invalid" className="d-block">
                                                            {validation.errors.groupe}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mb-3">
                                                    <Label className="form-label">document</Label>
                                                    <div className='d-flex'>
                                                        <Input
                                                            name="document"
                                                            className="form-control"
                                                            placeholder="Entrer les documents un par un"
                                                            type="text"
                                                            onChange={(e) => setDocumentName(e.target.value)}
                                                            value={documentName}
                                                        />
                                                        <button type="button" className='btn btn-primary ms-2 h-full my-auto' onClick={() => {
                                                            documents.push(documentName);
                                                            setDocumentName('');
                                                        }}>
                                                            +
                                                        </button>
                                                        </div>
                                                        {
                                                            documents.length > 0 && documents.map((doc, index) => (
                                                                <Badge key={index} color="primary" className="m-2 p-2 fs-6">
                                                                    {doc}
                                                                </Badge>
                                                            ))
                                                        }

                                                    {validation.touched.titre && validation.errors.titre ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.titre}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>


                                                

                                                <div className="mb-3">
                                                    <Label className="form-label">description</Label>
                                                    <Input
                                                        name="description"
                                                        type="textarea"
                                                        placeholder="Entrez la description"
                                                        rows="4"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.description || ""}
                                                        invalid={
                                                            validation.touched.description && validation.errors.description
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.description && validation.errors.description ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.description}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mt-4 d-grid">
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        type="submit"
                                                    >
                                                        Ajouter
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

export default DemandeBourse;
