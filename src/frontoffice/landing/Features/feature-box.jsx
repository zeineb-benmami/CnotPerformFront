import PropTypes from "prop-types";
import React from "react";

const FeatureBox = (props) => {
  return (
    <React.Fragment>
      <div className="mt-md-auto mt-4">
        <div className="d-flex align-items-center mb-2">
          <div className="features-number font-weight-semibold display-4 me-3">
            {props.num}
          </div>
          <h3 className="mb-0 text-3xl">{props.title}</h3>
        </div>
        <h5 className="text-muted text-xl">{props.desc}</h5>
        <div className="text-muted mt-4">
          {props.features.map((feature, key) => (
            <p key={key} className={feature.id === 1 ? "mb-2" : ""}>
              <i className="mdi mdi-circle-medium text-success me-1" />
              {feature.desc}
            </p>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

FeatureBox.propTypes = {
  desc: PropTypes.any,
  features: PropTypes.array,
  num: PropTypes.string,
  title: PropTypes.string,
};

export default FeatureBox;
