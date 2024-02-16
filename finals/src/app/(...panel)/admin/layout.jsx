'use client'

import Layout from "@/components/layouts/Layout";
import { _useAuth } from "@/context/Auth";
import { redirect } from "next/navigation";
import { useEffect } from "react"

const layout = ({ children }) => {
  // redirect to home page if he hasnt any tokens

  const [auth, setAuth, loading] = _useAuth();


  return auth?.role !== "admin" ? redirect('/') : <Layout> {children}</Layout>;
};

export default layout;
