import React, { useEffect, useState } from 'react';
import Navbar_Page from '../../frontoffice/landing/Navbar/Navbar';
import { Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getBourses } from '../../service/bourseService';
import Footer from "../../frontoffice/landing/Footer/footer";

const TaskCard = ({ _id, titre, description, imgUrl, status, onDragStart, toggle }) => (
  <Card className="draggable shadow-sm" id={_id} draggable="true" onDragStart={onDragStart}>
    <CardBody className="p-2">
      <div className="card-title d-flex justify-content-between">
        <a href="#" className="lead font-weight-light">{titre}</a>
        {status === 'attente' && 
          (<span className="bg-warning badge bg-secondary">En attente</span>)}
        {status === 'acceptee' &&
          (<span className="bg-success badge bg-secondary">Acceptée</span>)}
        {status === 'refusee' &&
          (<span className="bg-danger badge bg-secondary">Refusée</span>)}
      </div>
      <p>{description}</p>
      <Button color="primary" size="sm" onClick={toggle}>View</Button>
    </CardBody>
  </Card>
);

const BoardColumn = ({ title, bourses, onDrop, onDragOver, toggle }) => (
  <Col sm="6" md="4" xl="3">
    <Card className="bg-light">
      <CardBody>
        <h6 className="card-title text-uppercase text-truncate py-2">{title}</h6>
        <div className="items border border-light" onDrop={onDrop} onDragOver={onDragOver}>
          {bourses?.map((bourse, index) => (
            <React.Fragment key={bourse._id}>
              <TaskCard {...bourse} toggle={toggle} />
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

  const toggle = (task) => {
    console.log(task);
    
    setSelectedTask(task);
    setModal(!modal);
  };

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
      fetchBourses(userId);
    }
  }, []);

  const handleDragStart = (bourse) => {
    setDraggedTask(bourse);
  };

  const handleDrop = (status) => {
    if (draggedTask) {
      const sourceColumn = Object.keys(bourses).find(key => bourses[key].includes(draggedTask));
      setBourses((prevBourses) => {
        const updatedBourses = { ...prevBourses };
        updatedBourses[sourceColumn] = updatedBourses[sourceColumn].filter(bourse => bourse !== draggedTask);
        updatedBourses[status] = [...updatedBourses[status], draggedTask];
        return updatedBourses;
      });
      setDraggedTask(null);
    }
  };

  return (
    <React.Fragment>
      <Navbar_Page isSimple={true} />
      <section className="section hero-section" id="home">
        <Container>
          <div className="d-flex justify-content-center pt-3">
            <h3 className="font-weight-light text-white">Bourses Board</h3>
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
              toggle={() => toggle(bourses.attente)}
            />
            <BoardColumn
              title="En cours de traitement"
              bourses={bourses.EnCours.map(bourse => ({
                ...bourse,
                onDragStart: () => handleDragStart(bourse)
              }))}
              onDrop={() => handleDrop('EnCours')}
              onDragOver={(e) => e.preventDefault()}
              toggle={() => toggle(bourses.EnCours)}
            />
            <BoardColumn
              title="Approuvé"
              bourses={bourses.termine.map(bourse => ({
                ...bourse,
                onDragStart: () => handleDragStart(bourse)
              }))}
              onDrop={() => handleDrop('termine')}
              onDragOver={(e) => e.preventDefault()}
              toggle={() => toggle(bourses.termine)}
            />
          </Row>
        </Container>
      </section>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className='text-dark'>test</ModalHeader>
        <ModalBody>
          <p className='text-dark'><strong>Description:</strong> {selectedTask?.description}</p>
          <p className='text-dark'><strong>Status:</strong> {selectedTask?.status}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Footer />
    </React.Fragment>
  );
}

export default BourseListFront;
