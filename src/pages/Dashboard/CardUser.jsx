import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import { useSelector, useDispatch } from "react-redux";
import { dashboardBlogVisitorData } from "../../store/actions";

const CardUser = ({ popularpost, dataColors }) => {
  const apexCardUserChartColors = getChartColorsArray(dataColors);
  const [duration, setDuration] = useState("year");
  const dispatch = useDispatch();
  const visitorDurationData = (duration) => {
    setDuration(duration);
    dispatch(dashboardBlogVisitorData(duration));
  };

  useEffect(() => {
    dispatch(dashboardBlogVisitorData("year"));
  }, [dispatch]);

  const { visitor } = useSelector((state) => ({
    visitor: state.DashboardBlog.visitor,
  }));

  const summ = popularpost?.reduce(
    (acc, event) => acc + event.participants.length,
    0
  );

  const bud = popularpost?.reduce((acc, event) => acc + event.budget, 0);

  const series = [
    {
      name: "Current",
      data: visitor.Currentdata || [],
    },
    {
      name: "Previous",
      data: visitor.Previousdata || [],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: apexCardUserChartColors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: visitor.categories || [],
    },

    markers: {
      size: 3,
      strokeWidth: 3,

      hover: {
        size: 4,
        sizeOffset: 2,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  return (
    <React.Fragment>
      <Col xl={8}>
        <Row>
          <Col lg={4}>
            <Card className="mini-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Total Evènts</p>
                    <h5 className="mb-0">{popularpost?.length}</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title rounded-circle font-size-20 bg-light text-primary">
                      <i className="bx bxs-book-bookmark"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Budget Total</p>
                    <h5 className="mb-0">{bud}DT</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title rounded-circle font-size-20 bg-light text-primary">
                      <i className="bx bxs-note"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="blog-stats-wid">
              <CardBody>
                <div className="d-flex flex-wrap">
                  <div className="me-3">
                    <p className="text-muted mb-2">Participants</p>
                    <h5 className="mb-0">{summ}</h5>
                  </div>

                  <div className="avatar-sm ms-auto">
                    <div className="avatar-title rounded-circle font-size-20 bg-light text-primary">
                      <i className="bx bxs-message-square-dots"></i>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Card>
          <CardBody>
            <div className="d-flex flex-wrap">
              <h5 className="card-title me-2">Bourses</h5>
              <div className="ms-auto">
                <div className="toolbar d-flex flex-wrap gap-2 text-end">
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => visitorDurationData("all")}
                  >
                    ALL
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => visitorDurationData("onemonth")}
                  >
                    1M
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => visitorDurationData("sixmonth")}
                  >
                    6M
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-light btn-sm active"
                    onClick={() => visitorDurationData("year")}
                  >
                    1Y
                  </button>{" "}
                </div>
              </div>
            </div>

            <Row className="text-center">
              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">Today</p>
                  <h5>1024</h5>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">This Month</p>
                  <h5>
                    12356{" "}
                    <span className="text-success font-size-13">
                      0.2 % <i className="mdi mdi-arrow-up ms-1"></i>
                    </span>
                  </h5>
                </div>
              </Col>

              <Col lg={4}>
                <div className="mt-4">
                  <p className="text-muted mb-1">This Year</p>
                  <h5>
                    102354{" "}
                    <span className="text-success font-size-13">
                      0.1 % <i className="mdi mdi-arrow-up ms-1"></i>
                    </span>
                  </h5>
                </div>
              </Col>
            </Row>

            <hr className="mb-4" />
            <div id="area-chart" dir="ltr">
              <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
                className="apex-charts"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

CardUser.propTypes = {
  options: PropTypes.any,
  series: PropTypes.any,
};

export default CardUser;
