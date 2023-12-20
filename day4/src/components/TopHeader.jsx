import React from "react";
import { style } from "../config/CommonClasses";
import { Link } from "react-router-dom";
import useActive from "../hooks/useActive";

const TopHeader = () => {
  const { isActive } = useActive();

  return (
    <div className={`${style.flexCenter} gap-2`} style={{ fontSize: "15px" }}>
      <Link to={"/"} className={`myLinks ${isActive("/") ? "active-myLinks" : ""}`} role="button">
        Home
      </Link>
      <Link to={"/about"} className={`myLinks ${isActive("/about") ? "active-myLinks" : ""}`} role="button">
        About
      </Link>
      <Link to={"/contact-us"} className="myLinks" role="button">
        Contact Us
      </Link>
      <Link to={"dashboard"} className="myLinks" role="button">
        Dashboard
      </Link>
    </div>
  );
};

export default TopHeader;
