import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Redirecting from "../../../logic/utils/Redirecting";
import Layout from "../../components/layout/Layout";
import { _useAuth } from "../../../logic/context/AuthContext";

const AgentRoutes = ({ user }) => {
  const [auth] = _useAuth();
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
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default AgentRoutes;
