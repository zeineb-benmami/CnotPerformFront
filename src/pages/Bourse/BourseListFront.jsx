import React, { useEffect, useState } from 'react';
import Navbar_Page from '../../frontoffice/landing/Navbar/Navbar';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { attente, enCours, getBourses } from '../../service/bourseService';
import Footer from "../../frontoffice/landing/Footer/footer";
import { uploadFile } from '../../service/fileService';

const TaskCard = ({ _id, titre, description, imgUrl, status, onDragStart, onView }) => (
  <Card className="draggable shadow-sm" id={_id} draggable="true" onDragStart={onDragStart}>
    <CardBody className="p-2">
      <div className="card-title d-flex justify-content-between">
        <a href="#" className="lead font-weight-light">{titre}</a>
        {status === 'attente' && 
          (<span className="bg-warning badge bg-secondary">En attente</span>)}
        {status === 'En cours' && 
          (<span className="bg-info badge bg-secondary">En cours</span>)}
        {status === 'acceptee' &&
          (<span className="bg-success badge bg-secondary">Acceptée</span>)}
        {status === 'refusee' &&
          (<span className="bg-danger badge bg-secondary">Refusée</span>)}
      </div>
      <p>{description}</p>
      <Button color="primary" size="sm" onClick={onView}>View</Button>
    </CardBody>
  </Card>
);

const BoardColumn = ({ title, bourses, onDrop, onDragOver, onViewTask }) => (
  <Col sm="6" md="4" xl="3">
    <Card className="bg-light">
      <CardBody>
        <h6 className="card-title text-uppercase text-truncate py-2 text-dark">{title}</h6>
        <div className="items border border-light" onDrop={onDrop} onDragOver={onDragOver}>
          {bourses?.map((bourse) => (
            <React.Fragment key={bourse._id}>
              <TaskCard {...bourse} onView={() => onViewTask(bourse)} />
            </React.Fragment>
          ))}
        </div>
      </CardBody>
    </Card>
  </Col>
);

function BourseListFront() {
  const [bourses, setBourses] = useState({
    attente: [],
    EnCours: [],
    termine: []
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [federationId, setFederationId] = useState(null);


  const toggle = () => setModal(!modal);

  const fetchBourses = async (federationId) => {
    const response = await getBourses(null, null, null, federationId);
    const data = response.data;
    const attente = data.filter((bourse) => bourse.status === 'attente');
    const EnCours = data.filter((bourse) => bourse.status === 'En cours');
    const termine = data.filter((bourse) => bourse.status !== 'attente' && bourse.status !== 'En cours');
    
    setBourses({
      attente,
      EnCours,
      termine
    });
  }

  useEffect(() => {
    const userString = localStorage.getItem('authUser');
    if (userString) {
      const user = JSON.parse(userString);
      const userId = user.user._id;
      setFederationId(userId);
      fetchBourses(userId);
    }
  }, []);

  const handleDragStart = (bourse) => {
    setDraggedTask(bourse);
  };

  const handleDrop = async (status) => {    
    if (draggedTask) {
      if(status === 'attente'){
        await attente(draggedTask._id)
      }

      if(status === 'EnCours'){
        await enCours(draggedTask._id);
      }

      const sourceColumn = Object.keys(bourses).find(key => bourses[key].includes(draggedTask));
      setBourses((prevBourses) => {
        const updatedBourses = { ...prevBourses };
        updatedBourses[sourceColumn] = updatedBourses[sourceColumn].filter(bourse => bourse !== draggedTask);
        updatedBourses[status] = [...updatedBourses[status], draggedTask];
        return updatedBourses;
      });
      setDraggedTask(null);
      fetchBourses(federationId);
    }
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    toggle();
  };

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, event.target.files[0]]);
  };

  const handleUpload = async () => {
    let i = 0;
    setModal(false);
    for(let file of selectedFiles){
      const formData = new FormData();
      formData.append('file', file);
      await uploadFile(formData, selectedTask._id, selectedTask?.liste_documents[i].name);
      i = i + 1 ;
    }

    setModal(false);
  }

  return (
    <React.Fragment>
      <section className="section hero-section" id="home">
        <Container>
          <div className="d-flex justify-content-center pt-3">
            <h3 className="font-weight-light text-dark">Bourses Board</h3>
          </div>
          <Row className="justify-content-center flex-row flex-sm-nowrap py-3">
            <BoardColumn
              title="Reçus"
              bourses={bourses.attente.map(bourse => ({
                ...bourse,
                onDragStart: () => handleDragStart(bourse)
              }))}
              onDrop={() => handleDrop('attente')}
              onDragOver={(e) => e.preventDefault()}
              onViewTask={handleViewTask}
            />
            <BoardColumn
              title="En cours de traitement"
              bourses={bourses.EnCours.map(bourse => ({
                ...bourse,
                onDragStart: () => handleDragStart(bourse)
              }))}
              onDrop={() => handleDrop('EnCours')}
              onDragOver={(e) => e.preventDefault()}
              onViewTask={handleViewTask}
            />
            <BoardColumn
              title="Approuvé"
              bourses={bourses.termine.map(bourse => ({
                ...bourse,
                onDragStart: () => handleDragStart(bourse)
              }))}
              onDrop={() => handleDrop('termine')}
              onDragOver={(e) => e.preventDefault()}
              onViewTask={handleViewTask}
            />
          </Row>
        </Container>
      </section>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='text-dark'><h1>{selectedTask?.titre}</h1></ModalHeader>
        <ModalBody>
          <p className='text-dark'><strong>Montant : </strong> {selectedTask?.montant}</p>
          {selectedTask?.description && (<p className='text-dark'><strong>Description : </strong> {selectedTask?.description}</p>)}
          <p className='text-dark'><strong>Domaine : </strong> {selectedTask?.domaine}</p>
          <p className='text-dark'><strong>Groupe : </strong> {selectedTask?.groupe}</p>
          <p className='text-dark'><strong>Documents demandées : </strong> </p>
          <ul>
          {selectedTask?.liste_documents.map((doc) => (
            <li className='text-dark'><strong>{doc.name} : </strong> {doc.path === '' ? (<input type="file" onChange={handleFileChange}></input>) : (<span>déposée</span>)}</li>
          ))}
          </ul>
          
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpload}>
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default BourseListFront;
