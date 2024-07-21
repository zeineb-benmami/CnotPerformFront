import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import classnames from "classnames";

//import images
import small from "../../../../assets/images/small/img-2.jpg";
import small2 from "../../../../assets/images/small/img-6.jpg";
import { getEvents } from "../../../../service/event-service";

const BlogList = () => {
  const [activeTab, toggleTab] = useState("1");

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

  return (
    <React.Fragment>
      <Col xl={9} lg={8}>
        <Card>
          <ul
            className="nav nav-tabs nav-tabs-custom justify-content-center pt-2"
            role="tablist"
          >
            <NavItem>
              <NavLink
                to="#"
                className={classnames({
                  active: activeTab === "1",
                })}
                onClick={() => {
                  toggleTab("1");
                }}
              >
                All Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="#"
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Archive
              </NavLink>
            </NavItem>
          </ul>

          <TabContent className="p-4" activeTab={activeTab}>
            <TabPane tabId="1">
              <div>
                <Row className="justify-content-center">
                  <Col xl={8}>
                    <div>
                      <Row className="align-items-center">
                        <Col xs={4}>
                          <div>
                            <h5 className="mb-0">Evènements</h5>
                          </div>
                        </Col>

                        <Col xs={8}>
                          <div className="float-end">
                            <ul className="nav nav-pills">
                              <NavItem>
                                <NavLink
                                  className="disabled"
                                  to="#"
                                  tabIndex="-1"
                                >
                                  Affichage :
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <Link
                                  className="nav-link active"
                                  to="/blog-list"
                                >
                                  <i className="mdi mdi-format-list-bulleted"></i>
                                </Link>
                              </NavItem>
                              <NavItem>
                                <Link to="/blog-grid" className="nav-link">
                                  <i className="mdi mdi-view-grid-outline"></i>
                                </Link>
                              </NavItem>
                            </ul>
                          </div>
                        </Col>
                      </Row>

                      <hr className="mb-4" />

                      {eventList.map((evt, index) => (
                        <div key={index}>
                          <h5>
                            <Link
                              to={`/articles/${evt?._id}`}
                              className="text-dark"
                            >
                              {evt?.title}
                            </Link>
                          </h5>
                          <p className="text-muted">
                            {evt?.startDate.substring(0, 10)}
                          </p>

                          <div className="position-relative mb-3">
                            <img
                              src={evt?.imgUrl}
                              alt=""
                              className="img-thumbnail"
                            />
                          </div>

                          <ul className="list-inline">
                            <li className="list-inline-item mr-3">
                              <Link to="#" className="text-muted">
                                <i className="bx bx-purchase-tag-alt text-muted me-1 align-middle"></i>{" "}
                                {evt?.category}
                              </Link>
                            </li>
                            <li className="list-inline-item mr-3">
                              <Link to="#" className="text-muted">
                                <i className="bx bx-comment-dots text-muted me-1 align-middle"></i>{" "}
                                {evt?.participants?.length}
                              </Link>
                            </li>
                          </ul>
                          <p>{evt?.description}</p>

                          <div>
                            <Link
                              to={`/articles/${evt?._id}`}
                              className="text-primary"
                            >
                              Voir plus <i className="mdi mdi-arrow-right"></i>
                            </Link>
                          </div>
                          <hr className="my-5" />
                        </div>
                      ))}

                      <div className="text-center">
                        <ul className="pagination justify-content-center pagination-rounded">
                          <li className="page-item disabled">
                            <Link to="#" className="page-link">
                              <i className="mdi mdi-chevron-left"></i>
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link to="#" className="page-link">
                              1
                            </Link>
                          </li>
                          <li className="page-item active">
                            <Link to="#" className="page-link">
                              2
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link to="#" className="page-link">
                              3
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link to="#" className="page-link">
                              ...
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link to="#" className="page-link">
                              10
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link to="#" className="page-link">
                              <i className="mdi mdi-chevron-right"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>

            <TabPane tabId="2">
              <div>
                <Row className="justify-content-center">
                  <Col xl={8}>
                    <h5>Archive</h5>

                    <div className="mt-5">
                      <div className="d-flex flex-wrap">
                        <div className="me-2">
                          <h4>2020</h4>
                        </div>
                        <div className="ms-auto">
                          <span className="badge badge-soft-success rounded-pill font-size-12 float-end ms-1">
                            03
                          </span>
                        </div>
                      </div>
                      <hr className="mt-2" />

                      <div className="list-group list-group-flush">
                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i>{" "}
                          Beautiful Day with Friends
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Drawing
                          a sketch
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Project
                          discussion with team
                        </Link>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="d-flex flex-wrap">
                        <div className="me-2">
                          <h4>2019</h4>
                        </div>
                        <div className="ms-auto">
                          <span className="badge badge-soft-success badge-pill font-size-12 float-right ms-1">
                            06
                          </span>
                        </div>
                      </div>
                      <hr className="mt-2" />

                      <div className="list-group list-group-flush">
                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Coffee
                          with Friends
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Neque
                          porro quisquam est
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Quis
                          autem vel eum iure
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Cras mi
                          eu turpis
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Drawing
                          a sketch
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Project
                          discussion with team
                        </Link>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="d-flex flex-wrap">
                        <div className="me-2">
                          <h4>2018</h4>
                        </div>
                        <div className="ms-auto">
                          <span className="badge badge-soft-success rounded-pill font-size-12 float-end ms-1">
                            03
                          </span>
                        </div>
                      </div>
                      <hr className="mt-2" />

                      <div className="list-group list-group-flush">
                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i>{" "}
                          Beautiful Day with Friends
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Drawing
                          a sketch
                        </Link>

                        <Link
                          to="/blog-details"
                          className="list-group-item text-muted"
                        >
                          <i className="mdi mdi-circle-medium me-1"></i> Project
                          discussion with team
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </TabContent>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default BlogList;
