import React, { useEffect, useState } from 'react'
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Container, Row, Col, PaginationItem, PaginationLink, } from 'reactstrap';
import { acceptee, deleteBourse, getBourses, refusee } from '../../service/bourseService';
import BourseCard from './BourseCard';
import ModalMontantAccorde from './modalMontantAccorde';

function BourseList() {
    const [bourses, setBourses] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const totalPage = 12

    const navigate = useNavigate();

    const fetchBourses = async (page) =>{
      
      const response = await getBourses(page);
      console.log(response.data);
      
      setBourses(response.data);
    };

    useEffect(() =>{
        fetchBourses(page)
    },[])

   /* useEffect(() => {
      setFilteredEvents(
        eventList.filter((event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [searchQuery, eventList]);*/

  return (
    <div className="page-content">

      <Container fluid>
        {/* Render Breadcrumbs */}
        <Breadcrumbs
          title="Bourses"
          breadcrumbItem="Liste des bourses"
        />

        <Row>
          <Col lg="6">
            <form
              className="app-search d-none d-lg-block mb-4"
              style={{
                backgroundColor: "#fff",
                borderRadius: "25px",
                padding: "5px",
                boxShadow: "0 0 10px",
              }}
            >
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </Col>
        </Row>
        <Row>
          {/* Import Cards */}
          {bourses?.length == 0 && (
            <h3 className=" text-center">Aucune bourse trouvé</h3>
          )}
          <BourseCard bourses={bourses} refresh={fetchBourses} />
        </Row>

        <Row>
          <Col lg="12">
            <ul className="pagination pagination-rounded justify-content-center mb-5 mt-2">
              <PaginationItem disabled={page === 1}>
                <PaginationLink
                  previous
                  href="#"
                  onClick={() => handlePageClick(page - 1)}
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, i) => (
                <PaginationItem active={i + 1 === page} key={i}>
                  <PaginationLink
                    onClick={() => handlePageClick(i + 1)}
                    href="#"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={page === totalPage}>
                <PaginationLink
                  next
                  href="#"
                  onClick={() => handlePageClick(page + 1)}
                />
              </PaginationItem>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BourseList