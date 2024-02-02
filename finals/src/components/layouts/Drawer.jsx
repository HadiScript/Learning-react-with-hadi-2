import React from "react";
import { Offcanvas } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { X } from "react-feather";

const Drawer = ({ open, setOpen }) => {
  return (
    <Offcanvas show={open} onHide={() => setOpen(false)}>
      <Offcanvas.Header className="d-flexjustify-content-between align-items-center">
        <Offcanvas.Title>HadiScript</Offcanvas.Title>
        <X onClick={() => setOpen(false)} role="pointer" />
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Sidebar from="drawer" />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Drawer;
