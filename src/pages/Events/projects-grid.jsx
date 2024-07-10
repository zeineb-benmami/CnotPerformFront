import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import withRouter from "../../components/Common/withRouter";
import { map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//Import Cards
import CardProject from "./card-project";

import { getProjects as onGetProjects } from "/src/store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import AddEvent from "./Modals/AddEvent";
import { getEvents } from "../../service/event-service";

const ProjectsGrid = (props) => {
  //meta title
  document.title = "Cartes des évènements | CNOT PERFORM";

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const dispatch = useDispatch();

  const { projects } = useSelector((state) => ({
    projects: state.projects.projects,
  }));

  const [page, setPage] = useState(1);
  const [totalPage] = useState(5);

  useEffect(() => {
    dispatch(onGetProjects());
  }, [dispatch]);

  const handlePageClick = (page) => {
    setPage(page);
  };

  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      const data = await getEvents();
      if (isMounted) setEventList(await data.data.message);

      console.log(data.data.message);
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page-content">
      <AddEvent show={show} handleClose={handleClose} />
      <Container fluid>
        {/* Render Breadcrumbs */}
        <Breadcrumbs
          title="Evènements"
          breadcrumbItem="Cartes des évènements"
        />
        <div className="d-grid" style={{ justifyContent: "end" }}>
          <Button
            color="primary"
            className="font-16 btn-block"
            onClick={handleShow}
            style={{ borderRadius: "25px" }}
          >
            <i className="mdi mdi-plus-circle-outline w1/4 me-1" />
            Créer un Evènement
          </Button>
        </div>
        <Row>
          {/* Import Cards */}
          <CardProject events={eventList} />
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
              {map(Array(totalPage), (item, i) => (
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
  );
};

export default withRouter(ProjectsGrid);
