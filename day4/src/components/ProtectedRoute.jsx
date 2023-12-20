import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  return isAdmin ? (
    <div>
      ProtectedRoute -
      <Outlet />
    </div>
  ) : (
    <></>
  );
};

export default ProtectedRoute;
