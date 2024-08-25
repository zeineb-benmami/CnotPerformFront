import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ evt }) => {
  return (
    <>
      <Col xl="4" sm="6">
        <div className="event-container">
          <div className="position-relative">
            <Link to={`/articles/${evt?._id}`}>
              <img
                src={evt?.imgUrl}
                alt="event image"
                className="img-fluid d-block mx-auto rounded"
              />
            </Link>
            <div className="blog-badge font-size-11 badge m-1 bg-primary">
              {evt?.category}
            </div>
            <div className=" blog-badge font-size-11 badge position-absolute bg-success  end-0 m-1">
              {evt?.typeEvent}
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
                <h5 className="mb-3 text-white">
                  <i className="bx bx-task"></i>
                  {evt?.title}
                </h5>
                <p className="text-white">
                  <i className="bx bx-user"></i>
                  Participants: {evt?.participants?.length}
                </p>
                <div className="see-more text-white">
                  <Link to={`/articles/${evt?._id}`}>Voir plus</Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default BlogCard;
