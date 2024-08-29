import React, { useState } from 'react';
import {
  Badge, Button, Card, CardBody, Col, DropdownItem,
  DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, UncontrolledDropdown, UncontrolledTooltip
} from 'reactstrap';
import bourseIcon from "../../assets/images/icon/bourse.png";
import { acceptee, refusee } from '../../service/bourseService';

function BourseCard({ bourses, fetchBourses }) {
  const [modal, setModal] = useState(false);
  const [selectedBourse, setSelectedBourse] = useState(null);
  const [showRapportFinan, setShowRapportFinan] = useState(true);
  const [showRapportTech, setShowRapportTech] = useState(false);
  const [activeTab, setActiveTab] = useState('rapportFinan');

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      {bourses.reverse().map((bourse, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex">
                  <div className="avatar-md me-4">
                    <span className="avatar-title rounded-circle text-danger font-size-16 bg-light">
                      <img src={bourseIcon} alt="" />
                    </span>
                  </div>

                  <div className="flex-grow-1 overflow-hidden">
                    <h5 className="text-truncate font-size-15">
                      {bourse?.nature}
                    </h5>
                    <p className="text-muted mb-4">{bourse?.description}</p>

                    <Badge className="font-size-11 m-1" color="primary">
                      {bourse?.domaine}
                    </Badge>
                    <Badge
                      className="font-size-11 m-1"
                      color={
                        bourse.groupe === 'Universalité des jeux Olympiques' ? 'primary' :
                          bourse.groupe === 'Développement du sport' ? 'info' :
                            bourse.groupe === 'Entourage' ? 'success' :
                              bourse.groupe === 'Valeurs olympiques' ? 'danger' : 'secondary'
                      }>
                      {bourse?.groupe}
                    </Badge>
                  </div>
                </div>

                <UncontrolledDropdown className="ms-3">
                  <DropdownToggle className="card-drop" tag="a">
                    <i className="mdi mdi-dots-horizontal font-size-18" />
                  </DropdownToggle>
                  <DropdownMenu end className="dropdown-menu-end">
                    <DropdownItem>
                      <i className='bx bx-download font-size-16 me-1'></i> Télécharger
                    </DropdownItem>
                    <DropdownItem onClick={() => {
                      toggle();
                      setSelectedBourse(bourse);
                    }}>
                      <i className='bx bx-file-find font-size-16 me-1'></i> Afficher les rapports
                    </DropdownItem>
                    <DropdownItem onClick={async () => await acceptee(bourse._id)}>
                      <i className='bx bx-check-circle font-size-16 me-1 text-success' ></i> Accepter
                    </DropdownItem>
                    <DropdownItem onClick={async () => await refusee(bourse._id)}>
                      <i className='bx bx-x-circle font-size-16 me-1 text-danger' ></i> Refuser
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </CardBody>

            <div className="border-top px-4 py-3">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3">
                  <Badge
                    color={
                      bourse.status === 'attente' ? 'warning' :
                        bourse.status === 'En cours' ? 'info' :
                          bourse.status === 'acceptee' ? 'success' :
                            bourse.status === 'refusee' ? 'danger' : 'secondary'
                    }>
                    {bourse.status}
                  </Badge>
                </li>
                <li className="list-inline-item me-3" id="initDate">
                  <i className="bx bx-calendar me-1" /> {bourse?.date.substring(0, 10)}
                  <UncontrolledTooltip placement="top" target="initDate">
                    Start Date
                  </UncontrolledTooltip>
                </li>
                <li className="list-inline-item me-3" id="dueDate">
                  <i className="bx bx-calendar me-1" /> {bourse?.date.substring(0, 10)}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    Due Date
                  </UncontrolledTooltip>
                </li>
                <li className="list-inline-item me-3" id="comments">
                  <i className="bx bx-money me-1" /> {bourse.budgetPrev}
                  <UncontrolledTooltip placement="top" target="comments">
                    Budget Prévisionnel
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
      <Modal isOpen={modal} toggle={toggle} size="xl" >
        <ModalHeader toggle={toggle}>Les rapports</ModalHeader>
        <ModalBody>
        <Nav
          fill
          pills
          className='my-3'
        >
          <NavItem onClick={() => {
            setShowRapportFinan(true);
            setShowRapportTech(false);
            setActiveTab('rapportFinan');
          }}>
            <NavLink
              active={activeTab === 'rapportFinan'}
              href="#"
            >
              Rapport Financier
            </NavLink>
          </NavItem>
          <NavItem onClick={() => {
            setShowRapportFinan(false);
            setShowRapportTech(true);
            setActiveTab('rapportTech');
          }}>
            <NavLink href="#" active={activeTab === 'rapportTech'}>
              Rapport Technique
            </NavLink>
          </NavItem>
        </Nav>
        {showRapportTech &&(
          <>
          <h1 className='my-2'>Rapport Technique</h1>
          <object data={`http://localhost:3000/${selectedBourse?.rapportTech.replace(/\\/g, '/')}`} type="application/pdf" width="100%" height="400px">
            <a href={`http://localhost:3000/${selectedBourse?.rapportTech.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">View Document</a>
          </object>
          </>
        )}
        {showRapportFinan &&(
          <>  
          <h1 className='my-2'>Rapport Financier</h1>
          <object data={`http://localhost:3000/${selectedBourse?.rapportFinan.replace(/\\/g, '/')}`} type="application/pdf" width="100%" height="400px">
            <a href={`http://localhost:3000/${selectedBourse?.rapportFinan.replace(/\\/g, '/')}`} target="_blank" rel="noopener noreferrer">View Document</a>
          </object>
          </>
        )
        }
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default BourseCard;
