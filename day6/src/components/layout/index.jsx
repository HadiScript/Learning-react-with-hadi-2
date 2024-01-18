import { Col, Row } from "antd";
import React, { useState } from "react";
import LayoutHeader from "./LayoutHeader";
import LeftSidebar from "./leftSidebar";
import FloatBtn from "./FloatBtn";

import "../../assets/darkBlue.css";
import "../../assets/darkGrey.css";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("blue");

  return (
    <>
      <Row style={{ minHeight: "100vh" }} className={`${theme === "grey" ? "main-dg_layout" : "main-db_layout"} `}>
        <Col className="fixedColumn leftColumn border-end" md={4} xs={0}>
          <LeftSidebar />
        </Col>
        <Col className="centerColumn" md={16} xs={24}>
          <LayoutHeader />
          <div className="p-4">{children}</div>
        </Col>
        <Col className="fixedColumn rightColumn border-start" md={4} xs={0}>
          right sidebar
        </Col>

        <FloatBtn />
      </Row>
    </>
  );
};

export default Layout;
