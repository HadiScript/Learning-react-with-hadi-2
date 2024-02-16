"use client";

import { _useAuth } from "@/context/Auth";
import Layout from "../../../components/layouts/Layout";
import { redirect } from "next/navigation";

const Agent = ({ children }) => {
  const [auth, setAuth, loading] = _useAuth();
  return auth?.role !== "agent" ? redirect('/') : <Layout>{children}</Layout>;
};

export default Agent;
