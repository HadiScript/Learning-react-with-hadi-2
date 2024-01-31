import React from "react";

const PanelHeading = ({ icon, title, para, want }) => {
  return (
    <div className={`d-flex mt-2  _heading gap-3`}>
      {icon}
      <div>
        <div>
          <b>{title}</b>
        </div>
        {!want && (
          <small>
            <i>{para ? para : "Tailwind includes an expertly-crafted"} </i>
          </small>
        )}
      </div>
    </div>
  );
};

export default PanelHeading;
