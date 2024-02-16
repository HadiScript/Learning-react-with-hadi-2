import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Menu } from "react-feather";
import { useEffect, useState } from "react";
import Drawer from "./Drawer";
import { _useAuth } from "@/context/Auth";
import { redirect } from "next/navigation";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth, loading] = _useAuth();


  useEffect(() => {
    if (!auth && loading) {
      return redirect('/auth/login')
    }
  }, [auth])


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
