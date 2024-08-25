import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, List, ListGroup, ListGroupItem, Table } from 'reactstrap';
import { acceptee, deleteBourse, getBourses, refusee } from '../../service/bourseService';

function BourseList() {
    const { groupe } = useParams();
    const [bourses, setBourses] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const fetchBourses = async (page) =>{
      console.log(groupe);
      
      const response = await getBourses(page, groupe);
      console.log(response.data);
      
      setBourses(response.data);
    };

    useEffect(() =>{
        fetchBourses(page,groupe)
    },[page])

  return (
    <div className="page-content">
    <div className="section hero-section bg-ico-hero" id="home">
      <Container>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Titre</th>
              <th>Montant</th>
              <th>Documents</th>
              <th>Description</th>
              <th>Federation</th>
              <th>Domaine</th>
              <th>Groupe</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {bourses.map((bourse, index) => (
    <tr key={index}>
      <th scope="row">{page > 1 ? index + 11 : index + 1}</th> 
      <td>{bourse.titre}</td>
      <td>{bourse.montant}</td>
      <td>
        <ul>
          {bourse.liste_documents && bourse.liste_documents.map((doc, docIndex) => (
            <li key={docIndex}><a>{doc}</a></li>
          ))}
        </ul>
      </td>
      <td>{bourse.description}</td>
      <td>{bourse.Federation_Conserne?.name || 'N/A'}</td> 
      <td>{bourse.domaine}</td>
      <td>{bourse.groupe}</td>
      <td>{bourse.status === 'attente' && 
      (<span class="bg-warning badge bg-secondary"> En attente </span>)}
      {bourse.status === 'acceptee' &&
      (<span class="bg-success badge bg-secondary"> Acceptée </span>)}
      {bourse.status === 'refusee' &&
      (<span class="bg-danger badge bg-secondary"> Refusee </span>)}</td>
      <td>
      {bourse.status === 'attente' && (
        <Button color="success" outline onClick={async() => {
          await acceptee(bourse._id);
          fetchBourses(page, groupe);
        }}>Approuvé</Button>
      )}
      </td>
      <td>
      {bourse.status === 'attente' && (
      <Button color="danger" outline onClick={async() => {
          await refusee(bourse._id);
          fetchBourses(page, groupe);
        }}>Refusée</Button>
      )
    }
    </td>
    <td>
      <button class="avatar-sm rounded-circle bg-warning align-self-center mini-stat-icon" onClick={() => {navigate(`/addBourse/${bourse._id}`)}}><span class="avatar-title rounded-circle bg-warning"><i class='bx bx-edit font-size-24'></i></span></button>
      </td>
      <td>
      <button class="avatar-sm rounded-circle bg-danger align-self-center mini-stat-icon" onClick={async() => {
        await deleteBourse(bourse._id)
        fetchBourses(page, groupe);
        }}><span class="avatar-title rounded-circle bg-danger"><i class='bx bx-trash font-size-24'></i></span></button>
      </td>
    </tr>
  ))}
  {bourses.length == 0 &&(
                  <tr>
                  <td colSpan="13">
                    <h1>Aucune bourse trouvée</h1>
                    </td>
                  </tr>
  )}
            <tr>
              <td colSpan="13">
                <div className="d-flex justify-content-between">
                  <div></div>
                  <div className="pagination">
                    <ul className="pagination">
                      <li className="page-item previous" onClick={() => {
                            const step = page - 1;
                            fetchBourses(step, groupe);
                            setPage(step);                        
                            }}>
                        <a className="page-link">
                          <i className="mdi mdi-chevron-left" ></i>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" >{page}</a>
                      </li>
                      <li className="page-item next" onClick={() => {
                            const step = page +1;
                            fetchBourses(step, groupe);
                            setPage(step);                        
                            }}>
                        <a className="page-link" >
                          <i className="mdi mdi-chevron-right" ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
    </div>
  )
}

export default BourseList