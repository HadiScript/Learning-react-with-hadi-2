import React from "react";
import TopHeader from "../components/TopHeader";
import { style } from "../config/CommonClasses";

const About = () => {
  return (
    <>
      <TopHeader />
      <div style={{ height: "100vh" }} className={`${style.flexCenter}`}>
        <span className="display-1">About Page</span>
      </div>
    </>
  );
};

export default About;
