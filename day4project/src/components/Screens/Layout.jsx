import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      its layout
      <Outlet />
    </>
  );
};

export default Layout;
