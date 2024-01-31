import { Col, Row } from "antd";
import Sidebar from "./Sidebar";
import LayoutHeader from "./LayoutHeader";

import "../../../assets/layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Row style={{ minHeight: "100vh" }} className={"main-db_layout"}>
        <Col md={4} xs={0} className="fixedColumn leftColumn border-end">
          <Sidebar />
        </Col>
        <Col md={20} xs={24} className="centerColumn ">
          <LayoutHeader />
          <div className="p-3"> {children}</div>
        </Col>
      </Row>
    </>
  );
};

export default Layout;
