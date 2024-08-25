import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  Row,
  Card,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";

//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEvent } from "../../../service/event-service";
import { uploadPhotoToEvent } from "../../../service/photo-service";
import "/public/assets/styles/popup.css";
import Toasted from "./Toasted";

const AddEvent = ({ show, handleClose, refresh }) => {
  const [eventItem, setEventItem] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    budget: 0,
    category: "Entourage",
    typeEvent: "initiative",
    seats: 0,
  });

  //form errors validation
  const [errors, setErrors] = useState({});
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const [loading, setLoading] = useState(false);

  const startDateChange = (date) => {
    setstartDate(date);
  };

  const endDateChange = (date) => {
    setendDate(date);
  };

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.title.length < 2 || inputValues.title.length > 50) {
      errors.title = "Longeur doit être compris entre 2 et 50";
    }
    if (!startDate) {
      errors.startDate = "Date début est obligatoire";
    }
    if (!endDate || new Date(endDate) < new Date(startDate)) {
      errors.endDate =
        "Date fin est obligatoire et doit être supérieur à Date début";
    }
    if (new Date() > new Date(startDate)) {
      errors.startDate = "Date début doit être supérieur à aujourd hui";
    }
    if (
      Math.round(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      ) < 3
    ) {
      errors.startDate = "La durée doit être au moins 3 jours";
    }
    if (
      Math.round(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      ) > 270
    ) {
      errors.endDate = "La durée ne peut pas dépasser 9 mois";
    }
    if (inputValues.description.length > 200) {
      errors.description = "La description ne peut pas dépasser 200 caractères";
    }
    if (inputValues.budget <= 0 || inputValues.budget >= 10000) {
      errors.budget = "Budget doit être compris entre 0 et 10000";
    }
    if (inputValues.seats <= 0 || inputValues.seats >= 10000) {
      errors.seats = "Nombre de places des participants est invalide";
    }
    return errors;
  };

  // end of form errors validation

  const onValueChange = (e) => {
    setEventItem({ ...eventItem, [e.target.name]: e.target.value });
    setErrors(validateValues(eventItem));
  };

  useEffect(() => {
    setErrors(validateValues(eventItem));
  }, [eventItem, startDate, endDate]);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleAcceptedFiles = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  }, []);

  const handleDeleteFile = (fileToDelete) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToDelete)
    );
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (Object.keys(errors).length === 0) handleAddEvent();
  };

  const handleAddEvent = async () => {
    try {
      eventItem.startDate = startDate;
      eventItem.endDate = endDate;

      const result = await addEvent(eventItem);
      if (result.status === 201) {
        if (selectedFiles.length > 0) {
          handleUploadPhotos(result?.data.message);
        }
        handleClose();
        refresh();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUploadPhotos = async (id) => {
    try {
      // Set loading state to true when upload starts
      setLoading(true);

      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("filename", file);
        const result = await uploadPhotoToEvent(id, formData);
        if (result.status === 200) {
          setLoading(false);
        }
      });

      await Promise.all(uploadPromises);
      // Set loading state to false when all uploads are completed
      setLoading(false);
    } catch (error) {
      alert(error.message);
      // Set loading state to false when all uploads are completed
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={show} toggle={handleClose} centered={true} size="xl">
      <ModalHeader>Créer un Evènement</ModalHeader>
      <ModalBody className="px-5 py-3">
        <Row>
          <Col lg="6">
            <Form>
              {loading && (
                <div className="loading-popup">
                  <div className="loading-popup-content">
                    <>
                      <Row>
                        <Spinner color="info"></Spinner>
                        <Spinner color="dark"></Spinner>
                        <Spinner color="danger"></Spinner>
                      </Row>
                      <Row>
                        <Spinner color="warning"></Spinner>
                        <Spinner color="success"></Spinner>
                      </Row>
                    </>
                  </div>
                </div>
              )}

              <FormGroup className="mb-4" row>
                <Label htmlFor="title" className="col-form-label col-lg-2">
                  Titre
                </Label>
                <Col lg="10">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                    placeholder="Enter titre..."
                    value={eventItem.title}
                    onChange={onValueChange}
                  />
                  {errors.title && (
                    <p className=" text-danger ">{errors.title}</p>
                  )}
                </Col>
              </FormGroup>
              <FormGroup className="mb-4" row>
                <Label htmlFor="category" className="col-form-label col-lg-2">
                  Categorie
                </Label>
                <Col lg="10">
                  <Row>
                    <Col md={8} className="pr-0">
                      <Input
                        id="category"
                        name="category"
                        type="select"
                        value={eventItem.category}
                        onChange={onValueChange}
                      >
                        <option value="Entourage">Entourage</option>
                        <option value="Universalité des jeux olympiques">
                          Universalité des jeux olympiques
                        </option>
                        <option value="Développement du Sport">
                          Développement du Sport
                        </option>
                        <option value="Valeurs olympiques">
                          Valeurs olympiques
                        </option>
                        <option value="Gestion des CNO">Gestion des CNO</option>
                      </Input>
                    </Col>

                    <Col md={4} className="pr-0">
                      <Input
                        id="typeEvent"
                        name="typeEvent"
                        type="select"
                        value={eventItem.typeEvent}
                        onChange={onValueChange}
                      >
                        <option value="initiative">Initiative</option>
                        <option value="formation">Formation</option>
                        <option value="atelier">Atelier</option>
                      </Input>
                    </Col>
                  </Row>
                </Col>
              </FormGroup>
              <FormGroup className="mb-4" row>
                <Label
                  htmlFor="description"
                  className="col-form-label col-lg-2"
                >
                  Description
                </Label>
                <Col lg="10">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    placeholder="Enter Description..."
                    value={eventItem.description}
                    onChange={onValueChange}
                  />
                  {errors.description && (
                    <p className=" text-danger ">{errors.description}</p>
                  )}
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col lg="6">
            <Form>
              <FormGroup className="mb-4" row>
                <Label className="col-form-label col-lg-2">Durée</Label>
                <Col lg="10">
                  <Row>
                    <Col md={6} className="pr-0">
                      <DatePicker
                        id="startDate"
                        name="startDate"
                        className="form-control"
                        selected={startDate}
                        onChange={startDateChange}
                      />
                    </Col>
                    <Col md={6} className="pl-0">
                      {" "}
                      <DatePicker
                        id="endDate"
                        name="endDate"
                        className="form-control"
                        selected={endDate}
                        onChange={endDateChange}
                      />
                    </Col>
                  </Row>
                </Col>
                <Row>
                  <Col md={2}></Col>
                  <Col md={5}>
                    {errors.startDate && (
                      <p className=" text-danger ">{errors.startDate}</p>
                    )}
                  </Col>
                  <Col md={5}>
                    {errors.endDate && (
                      <p className=" text-danger ">{errors.endDate}</p>
                    )}
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup className="mb-4" row>
                <label htmlFor="budget" className="col-form-label col-lg-2">
                  Budget
                </label>
                <Col>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    placeholder="Enter Budget..."
                    className="form-control"
                    value={eventItem.budget}
                    onChange={onValueChange}
                  />
                  {errors.budget && (
                    <p className=" text-danger ">{errors.budget}</p>
                  )}
                </Col>
              </FormGroup>

              <FormGroup className="mb-4" row>
                <Label htmlFor="seats" className="col-form-label col-lg-2">
                  Tickets
                </Label>

                <Col>
                  <Input
                    id="seats"
                    name="seats"
                    type="number"
                    placeholder="Nombre maximal des participants"
                    className="form-control"
                    value={eventItem.seats}
                    onChange={onValueChange}
                  ></Input>
                  {errors.seats && (
                    <p className=" text-danger ">{errors.seats}</p>
                  )}
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Row className="mb-4">
            <Label className="col-form-label col-lg-2">Attached Files</Label>
            <Col lg="10">
              <Form>
                <Dropzone
                  onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                      <div
                        className="dz-message needsclick"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 text-muted bx bxs-cloud-upload" />
                          </div>
                          <h4>
                            Déposer vos photos ici ou bien cliquer sur upload.
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className="dropzone-previews mt-3" id="file-previews">
                  {selectedFiles.map((file, index) => (
                    <Card
                      className="dz-processing dz-image-preview dz-success dz-complete mb-0 mt-1 border shadow-none"
                      key={index + "-file"}
                    >
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={file.name}
                              src={file.preview}
                            />
                          </Col>
                          <Col>
                            <Link
                              to="#"
                              className="text-muted font-weight-bold"
                            >
                              {file.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{file.formattedSize}</strong>
                            </p>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDeleteFile(file)}
                            >
                              <i className="mdi mdi-trash-can font-size-16 me-1" />
                              Retirer
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  ))}
                </div>
              </Form>
            </Col>
          </Row>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={Object.keys(errors).length !== 0}
          className=" btn-block cta-button"
          onClick={handleSubmit}
          style={{ width: "200px" }}
        >
          Ajouter
        </Button>{" "}
        <Button
          className=" bg-slate-500"
          onClick={handleClose}
          style={{ borderRadius: "25px" }}
        >
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

AddEvent.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  refresh: PropTypes.func,
};

export default AddEvent;
