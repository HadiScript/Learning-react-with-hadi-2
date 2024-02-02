import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Menu } from "react-feather";
import { useState } from "react";
import Drawer from "./Drawer";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Container fluid className="main-layout">
        <Row>
          <Col md={2} className="d-none d-md-block sidebar">
            <Sidebar />
          </Col>
          <Col md={10}>
            <div className="d-block d-md-none mt-3 header d-flex justify-content-end">
              <Menu size={18} onClick={() => setOpen(true)} role="pointer" />
            </div>

            <div className="px-2 mt-5">{children}</div>
          </Col>
        </Row>
      </Container>

      <Drawer open={open} setOpen={setOpen} />
    </>
  );
};

export default Layout;
