import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import {
  Badge,
  Card,
  CardBody,
  Col,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { deleteEvent } from "../../service/event-service";

const CardProject = ({ events, refresh }) => {
  const onClickDelete = async (id) => {
    try {
      await deleteEvent(id);
      console.log("Delete successful");
      refresh();
    } catch (error) {
      console.error("There was an error!", error.message);
    }
  };

  return (
    <React.Fragment>
      {map(events, (evt, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle text-danger font-size-16 bg-light">
                    {evt?.imgUrl !== "" ? (
                      <img src={evt?.imgUrl} alt="" height="30" />
                    ) : (
                      <img src="assets/images/icons/calender.svg" alt="" />
                    )}
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-15">
                    <Link to={`/events/${evt._id}`} className="text-dark">
                      {evt?.title}
                    </Link>
                  </h5>
                  <p className="text-muted mb-4">{evt?.description}</p>

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
                  <div className="badge font-size-11 m-1 bg-primary">
                    {evt?.category}
                  </div>
                </div>

                <UncontrolledDropdown>
                  <DropdownToggle className="card-drop" tag="a">
                    <i className="mdi mdi-dots-horizontal font-size-18" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <DropdownItem>
                      <i className="mdi mdi-pencil font-size-16 text-success me-1" />{" "}
                      Modifier
                    </DropdownItem>
                    <DropdownItem onClick={() => onClickDelete(evt?._id)}>
                      <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />{" "}
                      Supprimer
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </CardBody>
            <div className="border-top px-4 py-3">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3">
                  <Badge className={"bg-" + evt.color}>{evt.status}</Badge>
                </li>{" "}
                <li className="list-inline-item me-3" id="initDate">
                  <i className="bx bx-calendar me-1" />{" "}
                  {evt.startDate.substring(0, 10)}
                  <UncontrolledTooltip placement="top" target="initDate">
                    Start Date
                  </UncontrolledTooltip>
                </li>{" "}
                <li className="list-inline-item me-3" id="dueDate">
                  <i className="bx bx-calendar me-1" />{" "}
                  {evt.endDate.substring(0, 10)}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    Due Date
                  </UncontrolledTooltip>
                </li>{" "}
                <li className="list-inline-item me-3" id="comments">
                  <i className="bx bx-comment-dots me-1" />{" "}
                  {evt?.participants?.length}
                  <UncontrolledTooltip placement="top" target="comments">
                    Participants
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
  refresh: PropTypes.func,
};

export default CardProject;
