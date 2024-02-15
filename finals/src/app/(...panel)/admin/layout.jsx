'use client'

import Layout from "@/components/layouts/Layout";
import React from "react";

const layout = ({ children }) => {
  // redirect to home page if he hasnt any tokens
  return <Layout>{children}</Layout>;
};

export default layout;
