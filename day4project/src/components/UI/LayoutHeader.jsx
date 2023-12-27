import React from "react";
import { Col, Row } from "react-bootstrap";
import { LogIn, Menu } from "react-feather";

const LayoutHeader = ({ setShowSidebar }) => {
  return (
    <Row>
      <Col className="d-flex justify-content-between align-items-center p-3  rounded " style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
        <div>
          <div className="d-block d-md-none" onClick={() => setShowSidebar(true)}>
            <Menu size={15} />
          </div>
        </div>
        <div className={"d-flex justify-content-center align-items-center gap-2 "}>
          Login <LogIn size={15} />
        </div>
      </Col>
    </Row>
  );
};

export default LayoutHeader;
