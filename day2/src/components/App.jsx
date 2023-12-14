// styling...

import React from "react";

const karachiStyle = { color: "white", backgroundColor: "grey" };
const lahoreiStyle = { color: "red", backgroundColor: "purple" };

function StyleApp() {
  let cityName = "karachi";

  return (
    <>
      {/* <h5 style={cityName === "karachi" ? karachiStyle : lahoreiStyle}>
        {cityName} - {cityName === "karachi" ? "yes" : "noe"}
      </h5> */}
      <h5 style={{ color: `${cityName === "karachi" ? "black" : "orange"}` }}>{cityName}</h5>
      am here In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on
      meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
      <button>see more</button>
    </>
  );
}

export default StyleApp;
