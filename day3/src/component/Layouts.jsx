import React, { Children, useState } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";

const Layouts = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Container fluid>
        <Row>
          {/* sidebar */}
          <Col className="d-none d-md-block" style={{ height: "100vh", width: "200px", flex: "0 0 auto", borderRight: "0.01rem solid lightgrey" }}>
            {/* <Sidebar /> */}
          </Col>

          {/* content */}
          <Col className="m-1">
            {/* header */}
            <Row>
              <Col className="d-flex justify-content-between align-items-center p-1  rounded " style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                <div className="d-block d-md-none" onClick={() => setShowSidebar(true)}>
                  Open Side
                </div>
                <div>Login</div>
              </Col>
            </Row>

            <Row>
              <Col className="p-1">{children}</Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {" "}
          {/* <Sidebar /> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Layouts;
