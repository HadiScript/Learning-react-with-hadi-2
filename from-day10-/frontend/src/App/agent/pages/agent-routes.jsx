import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Redirecting from "../../../logic/utils/Redirecting";
import { AuthContext } from "../../../logic/context/AuthContext";
import AgentLayout from "../layout";

const AgentRoutes = ({ user }) => {
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const fetchingCurrectUser = async () => {
    setLoading(false);
    try {
      const res = await axios.get("auth/current-agent");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchingCurrectUser();
    }
  }, [auth && auth?.token]);

  return loading ? (
    <Redirecting />
  ) : (
    <AgentLayout>
      <Outlet />
    </AgentLayout>
  );
};

export default AgentRoutes;
