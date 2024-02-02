import React from "react";
import { Compass } from "react-feather";

const Heading = ({ title, icon }) => {
  return (
    <div className="d-flex justify-content-start align-items-center gap-3 mb-5">
      {icon}
      <div className="d-flex flex-column justify-content-start ">
        <h5>{title}</h5>
        <small>How and which Bootstrap styles you include is up to you </small>
      </div>
    </div>
  );
};

export default Heading;
