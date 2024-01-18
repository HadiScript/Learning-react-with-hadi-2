import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { LogIn, Menu } from "react-feather";
import Sidebar from "../UI/Sidebar";
import LayoutHeader from "../UI/LayoutHeader";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          {/* sidebar */}
          <Col className="d-none d-md-block" style={{ height: "100vh", width: "200px", flex: "0 0 auto", borderRight: "0.01rem solid lightgrey" }}>
            <Sidebar title={"HadiScript"} />
          </Col>

          {/* content */}
          <Col className="m-1">
            {/* header */}
            <LayoutHeader setShowSidebar={setShowSidebar} />

            <Row>
              <Col className="p-1">
                <div className="p-3">
                  {/* <Outlet /> */}
                  {children}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Offcanvas style={{ width: "250px" }} show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>HadScript</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Layout;
