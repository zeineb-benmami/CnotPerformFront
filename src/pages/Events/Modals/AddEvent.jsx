import PropTypes from "prop-types";
import React, { useEffect } from "react";
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
} from "reactstrap";

//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addEvent } from "../../../service/event-service";
import { uploadPhotoToEvent } from "../../../service/photo-service";

const AddEvent = ({ show, handleClose, refresh }) => {
  const [eventItem, setEventItem] = useState({
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    budget: 0,
    category: "Entourage",
  });

  //form errors validation
  const [errors, setErrors] = useState({});
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const startDateChange = (date) => {
    setstartDate(date);
  };

  const endDateChange = (date) => {
    setendDate(date);
  };

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.title.length < 2 || inputValues.title.length > 50) {
      errors.name = "Title length must be between 2 and 50";
    }
    if (!startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!endDate || new Date(endDate) < new Date(startDate)) {
      errors.endDate = "End Date is required & must be greater than startDate";
    }
    if (new Date() > new Date(startDate)) {
      errors.startDate = "Start Date must be greater than today";
    }
    if (
      Math.round(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      ) < 3
    ) {
      errors.startDate =
        "Difference in start date & end date must be more than 3 days";
    }
    if (
      Math.round(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 3600 * 24)
      ) > 270
    ) {
      errors.endDate =
        "Difference in start date & end date must be less than 9 months";
    }
    if (inputValues.description.length > 200) {
      errors.description =
        "Description exceeds maximum length of 200 characters";
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
  }, [eventItem]);

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    console.log(files);

    setselectedFiles(files);
  }

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

    handleAddEvent();
  };

  const handleAddEvent = async () => {
    try {
      eventItem.startDate = startDate;
      eventItem.endDate = endDate;

      const result = await addEvent(eventItem);
      if (result.status === 201) {
        if (selectedFiles.length > 0) {
          handleUploadPhoto(result?.data.message);
        }
        handleClose();
        refresh();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUploadPhoto = async (id) => {
    try {
      const formData = new FormData();
      formData.append("filename", selectedFiles[0]);
      const result = await uploadPhotoToEvent(id, formData);
      if (result.status === 200) {
        alert(result.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Modal isOpen={show} toggle={handleClose} centered={true} size="xl">
      <ModalHeader>Créer un Evènement</ModalHeader>
      <ModalBody className="px-5 py-3">
        <Row>
          <Col lg="6">
            <Form>
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
                </Col>
              </FormGroup>
              <FormGroup className="mb-4" row>
                <Label for="category" className="col-form-label col-lg-2">
                  Categorie
                </Label>

                <Col>
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
                </Col>
              </FormGroup>

              <FormGroup className="mb-4" row>
                <Label for="participants" className="col-form-label col-lg-2">
                  No participants
                </Label>

                <Col>
                  <Input
                    id="participants"
                    name="participants"
                    type="number"
                    placeholder="Enter participants..."
                    className="form-control"
                  ></Input>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Row className="mb-4">
            <Label className="col-form-label col-lg-2">Attached Files</Label>
            <Col lg="10">
              <Form>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleAcceptedFiles(acceptedFiles);
                  }}
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
                            Déposer vos fichiers ici ou bien cliquer sur upload.
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className="dropzone-previews mt-3" id="file-previews">
                  {selectedFiles.map((f, i) => {
                    return (
                      <Card
                        className="dz-processing dz-image-preview dz-success dz-complete mb-0 mt-1 border shadow-none"
                        key={i + "-file"}
                      >
                        <div className="p-2">
                          <Row className="align-items-center">
                            <Col className="col-auto">
                              <img
                                data-dz-thumbnail=""
                                height="80"
                                className="avatar-sm rounded bg-light"
                                alt={f.name}
                                src={f.preview}
                              />
                            </Col>
                            <Col>
                              <Link
                                to="#"
                                className="text-muted font-weight-bold"
                              >
                                {f.name}
                              </Link>
                              <p className="mb-0">
                                <strong>{f.formattedSize}</strong>
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Form>
            </Col>
          </Row>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={handleSubmit}
          style={{ borderRadius: "25px" }}
        >
          Ajouter
        </Button>{" "}
        <Button
          color="secondary"
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
