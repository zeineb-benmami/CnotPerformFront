import PropTypes from "prop-types";
import React from "react";
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

const AddEvent = ({ show, handleClose }) => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [selectedFiles, setselectedFiles] = useState([]);

  const startDateChange = (date) => {
    setstartDate(date);
  };

  const endDateChange = (date) => {
    setendDate(date);
  };

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

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
  return (
    <Modal isOpen={show} toggle={handleClose} centered={true} size="xl">
      <ModalHeader>Créer un Evènement</ModalHeader>
      <ModalBody className="px-5 py-3">
        <Row>
          <Col lg="6">
            <Form>
              <FormGroup className="mb-4" row>
                <Label
                  htmlFor="projectname"
                  className="col-form-label col-lg-2"
                >
                  Titre
                </Label>
                <Col lg="10">
                  <Input
                    id="projectname"
                    name="projectname"
                    type="text"
                    className="form-control"
                    placeholder="Enter Project Name..."
                  />
                </Col>
              </FormGroup>
              <FormGroup className="mb-4" row>
                <Label
                  htmlFor="projectdesc"
                  className="col-form-label col-lg-2"
                >
                  Description
                </Label>
                <Col lg="10">
                  <textarea
                    className="form-control"
                    id="projectdesc"
                    rows="3"
                    placeholder="Enter Project Description..."
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
                        className="form-control"
                        selected={startDate}
                        onChange={startDateChange}
                      />
                    </Col>
                    <Col md={6} className="pl-0">
                      {" "}
                      <DatePicker
                        className="form-control"
                        selected={endDate}
                        onChange={endDateChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </FormGroup>

              <FormGroup className="mb-4" row>
                <label
                  htmlFor="projectbudget"
                  className="col-form-label col-lg-2"
                >
                  Budget
                </label>
                <Col md={6}>
                  <Input
                    id="projectbudget"
                    name="projectbudget"
                    type="number"
                    placeholder="Enter Project Budget..."
                    className="form-control"
                  />
                </Col>
              </FormGroup>

              <FormGroup className="mb-4" row>
                <label htmlFor="projectp" className="col-form-label col-lg-2">
                  Participants
                </label>
                <Col md={6}>
                  <Input
                    id="projectp"
                    name="projectp"
                    type="number"
                    placeholder="Enter Project Budget..."
                    className="form-control"
                  />
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
                          <h4>Drop files here or click to upload.</h4>
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
        <Button color="primary">Ajouter</Button>{" "}
        <Button color="secondary" onClick={handleClose}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

AddEvent.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};

export default AddEvent;
