import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

import { getEvents } from "../../../service/event-service";

const Blog = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    try {
      let isMounted = true;
      const fetchEvents = async () => {
        const data = await getEvents();
        if (isMounted) setEventList(await data.data.message);
      };

      fetchEvents();

      return () => {
        isMounted = false;
      };
    } catch (error) {
      alert(error.message);
    }
  }, []);

  // Get current events for pagination
  const startIndex = eventList?.length > 3 ? eventList.length - 3 : 0;
  const currentEvents = eventList?.slice(startIndex, eventList?.length);

  return (
    <React.Fragment>
      <section className="section bg-white" id="news">
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-5 text-center">
                <div className="small-title">Evènements</div>
                <h3>Nouvelles Récents</h3>
              </div>
            </Col>
          </Row>

          <Row>
            {currentEvents.map((evt, key) => (
              <Col xl="4" sm="6" key={key}>
                <div className="blog-box mb-xl-0 mb-4">
                  <div className="position-relative">
                    <img
                      src={evt?.imgUrl}
                      alt=""
                      className="img-fluid d-block mx-auto rounded"
                      style={{ maxHeight: "300px", minHeight: "280px" }}
                    />
                    <div className="blog-badge font-size-11 badge bg-primary">
                      {evt?.category}
                    </div>
                  </div>

                  <div className="text-muted mt-4">
                    <p className="mb-2">
                      <i className="bx bx-calendar text-danger ms-1" />{" "}
                      {evt?.startDate.substring(0, 10)}
                    </p>
                    <h5 className="mb-3">{evt?.title}</h5>
                    <p>{evt?.description}</p>

                    <div>
                      <Link to={`/articles/${evt?._id}`}>Read more</Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}

            <div className="ms-lg-2 text-center">
              <Link to="/articles">
                <Button
                  color="primary"
                  className="font-16 btn-block"
                  style={{ borderRadius: "25px" }}
                >
                  Afficher plus d'évènements
                </Button>
              </Link>
            </div>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Blog;
