'use client'

import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { API } from "@/actions/api";
import { useRouter } from "next/navigation";
import { Errs } from "@/helpers/Errs";

export const AuthContext = createContext();

export const _useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false)


  // error handing -> try catch{}
  const fetchingData = async () => {
    // cookie
    setLoading(true)
    try {
      const res = await axios.get(`${API}/auth/current-user`, { withCredentials: true });
      setAuth(res.data.user)
    } catch (error) {
      // Errs(error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (window) {
      fetchingData()
    }
  }, [])

  // axios.defaults.baseURL = "http://localhost:8000";


  axios.defaults.withCredentials = true

  return <AuthContext.Provider value={[auth, setAuth, loading]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
