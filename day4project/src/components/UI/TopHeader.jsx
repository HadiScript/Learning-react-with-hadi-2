import React from "react";
import { Activity, Gift } from "react-feather";
import { myStyle } from "../../assets/style/style";
import { Link } from "react-router-dom";

const NavArr = [
  {
    icon: <Activity size={15} />,
    pathname: "/",
    name: "Cover",
  },
  {
    icon: <Gift size={15} />,
    pathname: "/explore",
    name: "Explore",
  },
];

const TopHeader = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center gap-2 py-1">
        <span className="logo">HadiScript</span>
        <div className="d-flex justify-content-center align-items-center gap-3">
          {NavArr.map((x) => (
            <Link to={x.pathname} key={x.name} role="button" className="d-flex justify-content-center align-items-center gap-1" style={{ color: myStyle.primaryColor }}>
              {x.name} {x.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
