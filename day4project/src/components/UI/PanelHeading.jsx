import React from "react";

const PanelHeading = ({ title, Icon }) => {
  return (
    <div className="d-flex justify-content-start align-items-center gap-2 mb-3 ">
      {Icon}
      <h2>{title}</h2>
    </div>
  );
};

export default PanelHeading;
