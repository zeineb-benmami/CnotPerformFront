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
  const startIndex = eventList?.length > 6 ? eventList.length - 6 : 0;
  const currentEvents = eventList?.slice(startIndex, eventList?.length);

  return (
    <React.Fragment>
      <section className="section hero-section" id="news">
        <div class="glow-container">
          <div class="glow-circle left"></div>
          <div class="glow-circle right"></div>
        </div>
        <Container>
          <Row>
            <Col lg="12">
              <div className="mb-5 text-left text-white">
                <div className="small-title text-white">Evènements</div>
                <h3>Nouvelles Récents</h3>
              </div>
            </Col>
          </Row>

          <Row className=" row-span-3">
            {currentEvents.map((evt, key) => (
              <Col xl="4" sm="6" key={key}>
                <div className="event-container">
                  <div className="position-relative">
                    <img
                      src={evt?.imgUrl}
                      alt=""
                      className="img-fluid d-block mx-auto rounded"
                    />
                    <div className="blog-badge font-size-11 badge bg-primary">
                      {evt?.category}
                    </div>
                  </div>
                  <Row>
                    <Col md="3" sm="6">
                      <h1 className="mb-2">
                        <i className="bx bx-calendar text-danger ms-1" />{" "}
                        {evt?.startDate.substring(8, 10)}/
                        {new Date(evt?.startDate).getUTCMonth() + 1}
                      </h1>
                    </Col>
                    <Col md="9" sm="6">
                      <div className="text-muted mt-4">
                        <h5 className="mb-3 text-white">{evt?.title}</h5>

                        <div className="see-more text-white">
                          <Link to={`/articles/${evt?._id}`}>Voir plus</Link>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}

            <div className="ms-lg-2 mt-2 text-center">
              <Link to="/articles">
                <Button
                  color="primary"
                  className="font-16 btn-block cta-button"
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
