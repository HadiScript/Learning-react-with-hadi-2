import React from "react";
import TopHeader from "../UI/TopHeader";
import Footer from "../UI/Footer";
import { myStyle } from "../../assets/style/style";

const Cover = () => {
  return (
    //     #0C356A
    // #000000
    <div style={{ height: "100vh" }}>
      <TopHeader />
      <div style={{ height: "90%" }} className="d-flex justify-content-center align-items-center">
        <span className="display-1 ">
          <b>Its Covert page</b>
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Cover;
