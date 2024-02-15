'use client'

import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { API } from "@/actions/api";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const _useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const fetchingData = async () => {
    const res = await axios.get(`${API}/auth/current-user`, { withCredentials: true });
    setAuth(res.data.user)
  };

  useEffect(() => {
    if (window) {
      fetchingData()
    }
  }, [])

  // axios.defaults.baseURL = "http://localhost:8000";


  axios.defaults.withCredentials = true

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
