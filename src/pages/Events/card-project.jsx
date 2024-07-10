import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import { Badge, Card, CardBody, Col, UncontrolledTooltip } from "reactstrap";
import images from "/src/assets/images";
import companies from "/src/assets/images/companies";

const CardProject = ({ events }) => {
  return (
    <React.Fragment>
      {map(events, (evt, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle text-danger font-size-16 bg-light">
                    <img src={companies[evt.img]} alt="" height="30" />
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-15">
                    <Link
                      to={`/projects-overview/${evt._id}`}
                      className="text-dark"
                    >
                      {evt.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-4">{evt.description}</p>

                  {/*<div className="avatar-group">
                    {evt.team.map((team, key) =>
                      !team.img || team.img !== "Null" ? (
                        <React.Fragment key={key}>
                          <div className="avatar-group-item">
                            <Link
                              to="#"
                              className="d-inline-block"
                              id={"member" + key}
                            >
                              <img
                                src={images[team.img]}
                                className="rounded-circle avatar-xs"
                                alt=""
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target={"member" + key}
                              >
                                {team.fullname}
                              </UncontrolledTooltip>
                            </Link>
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={key}>
                          <div className="avatar-group-item">
                            <Link
                              to="#"
                              className="d-inline-block"
                              id={"member" + key}
                            >
                              <div className="avatar-xs">
                                <span
                                  className={
                                    "avatar-title rounded-circle bg-" +
                                    team.color +
                                    " text-white" +
                                    " font-size-16"
                                  }
                                >
                                  {team.name}
                                </span>
                                <UncontrolledTooltip
                                  placement="top"
                                  target={"member" + key}
                                >
                                  {team.fullname}
                                </UncontrolledTooltip>
                              </div>
                            </Link>
                          </div>
                        </React.Fragment>
                      )
                    )}
                  </div>*/}
                </div>
              </div>
            </CardBody>
            <div className="border-top px-4 py-3">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3">
                  <Badge className={"bg-" + evt.color}>{evt.status}</Badge>
                </li>{" "}
                <li className="list-inline-item me-3" id="dueDate">
                  <i className="bx bx-calendar me-1" />{" "}
                  {evt.endDate.substring(0, 10)}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    Due Date
                  </UncontrolledTooltip>
                </li>{" "}
                <li className="list-inline-item me-3" id="comments">
                  <i className="bx bx-comment-dots me-1" /> {evt.participants}
                  <UncontrolledTooltip placement="top" target="comments">
                    Comments
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

CardProject.propTypes = {
  events: PropTypes.array,
};

export default CardProject;
