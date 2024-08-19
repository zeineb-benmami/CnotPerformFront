import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

// import images

import Footer from "../Footer/footer";
import { getEvents } from "../../../service/event-service";
import { getPhotosByEvent } from "../../../service/photo-service";
import Navbar_Page from "../Navbar/Navbar";

const BlogDetails = () => {
  //meta title
  const { id } = useParams();

  const [event, setEvent] = useState([]);

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    try {
      const fetchEvent = async () => {
        const data = await getEvents(id);
        setEvent(data.data.message);
      };

      const fetchEventPhotos = async () => {
        const data = await getPhotosByEvent(id);
        setPhotos(data.data.message);
      };

      fetchEvent();
      fetchEventPhotos();
    } catch (err) {
      console.log(err.message);
    }
    return () => {};
  }, []);

  document.title = `Evènement: ${event?.title} | CNOT PERFORM`;

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === photos?.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? photos?.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = photos?.map((photo, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img
          src={photo?.fileUrl}
          alt={photo?.fileName}
          style={{ textAlign: "center", maxHeight: "400px", margin: "auto" }}
        />
        <CarouselCaption
          className="carousel-dark"
          captionText={photo?.fileName}
          captionHeader={photo?.fileName}
        />
      </CarouselItem>
    );
  });
  return (
    <React.Fragment>
      <Navbar_Page navClass="nav-sticky" imglight={false} isSimple={false} />
      <div className="page-content section hero-section">
        <Container fluid>
          <Breadcrumbs title="Evènement" breadcrumbItem="Evènement Details" />
          <Row>
            <div className="pt-3">
              <div className="justify-content-center row">
                <div className="col-xl-8">
                  <div>
                    <div className="text-center">
                      <div className="mb-4">
                        <Link to="#" className="badge font-size-12 bg-light">
                          <i className="bx bx-purchase-tag-alt text-muted me-1 align-middle"></i>{" "}
                          {event?.category}
                        </Link>
                      </div>
                      <h4>{event?.title}</h4>
                      <p className="text-muted mb-4">
                        <i className="mdi mdi-calendar me-1"></i>
                        {event?.startDate?.substring(0, 10)}{" "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="mdi mdi-calendar me-1"></i>
                        {event?.endDate?.substring(0, 10)}
                      </p>
                    </div>

                    <hr />
                    <div className="text-center">
                      <Row>
                        <Col sm={4}>
                          <div>
                            <p className="text-muted mb-2">Type</p>
                            <h5 className="font-size-15">{event?.typeEvent}</h5>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mt-sm-0 mt-4">
                            <p className="text-muted mb-2">Prix</p>
                            <h5 className="font-size-15">
                              {event?.budget} TND
                            </h5>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mt-sm-0 mt-4">
                            <p className="text-muted mb-2">Publié par</p>
                            <h5 className="font-size-15">CNOT</h5>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <hr />

                    <div
                      className="my-5"
                      style={{ maxHeight: "500px", minHeight: "480px" }}
                    >
                      <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                      >
                        <CarouselIndicators
                          items={photos}
                          activeIndex={activeIndex}
                          onClickHandler={goToIndex}
                        />
                        {slides}
                        <CarouselControl
                          className="carousel-dark"
                          direction="prev"
                          directionText="Previous"
                          onClickHandler={previous}
                        />
                        <CarouselControl
                          className="carousel-dark"
                          direction="next"
                          directionText="Next"
                          onClickHandler={next}
                        />
                      </Carousel>
                    </div>

                    <hr />

                    <div className="mt-4">
                      <div className="text-muted font-size-14">
                        <p>{event?.description}</p>

                        <p className="mb-4">
                          Ut enim ad minima veniam, quis nostrum exercitationem
                          ullam corporis suscipit laboriosam, nisi ut aliquid ex
                          ea reprehenderit qui in ea voluptate velit esse quam
                          nihil molestiae consequatur, vel illum qui dolorem eum
                          fugiat quo voluptas nulla pariatur? At vero eos et
                          accusamus et iusto odio dignissimos ducimus qui
                          blanditiis praesentium voluptatum deleniti atque
                          corrupti quos dolores et quas molestias excepturi sint
                          occaecati cupiditate non provident, similique sunt
                        </p>

                        <p>
                          Itaque earum rerum hic tenetur a sapiente delectus, ut
                          aut reiciendis voluptatibus maiores alias consequatur
                          aut perferendis doloribus asperiores repellat. Sed ut
                          perspiciatis unde omnis iste natus error sit
                        </p>
                      </div>

                      <hr />

                      <div className="mt-4">
                        <h5 className="font-size-16 mb-3">Participation</h5>

                        <Form>
                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label htmlFor="commentname-input">Nom</Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="commentname-input"
                                  placeholder="Enter name"
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label htmlFor="commentemail-input">
                                  Email
                                </Label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="commentemail-input"
                                  placeholder="Enter email"
                                />
                              </div>
                            </Col>
                          </Row>

                          <div className="mb-3">
                            <Label htmlFor="commentmessage-input">
                              Message
                            </Label>
                            <textarea
                              className="form-control"
                              id="commentmessage-input"
                              placeholder="Your message..."
                              rows="3"
                            ></textarea>
                          </div>

                          <div className="text-end">
                            <button
                              type="submit"
                              className="btn btn-primary w-sm"
                              style={{ borderRadius: "25px" }}
                            >
                              Participer
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default BlogDetails;
