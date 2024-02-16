"use client";

import axios from "axios";
import { useState } from "react";
import { API } from "./api";
import { Errs } from "@/helpers/Errs";
import { useRouter } from "next/navigation";
import { _useAuth } from "@/context/Auth";

const initValues = {
  name: "",
  password: "",
  email: "",
};

export const useCommon = () => {
  const [auth, setAuth] = _useAuth();
  const [loginData, setLoginData] = useState(initValues);
  const [loading, setLoading] = useState(false);

  // console.log()

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/signin`, loginData, { withCredentials: "true" });
      setAuth(data.user);

      // if(data.user.role === "admin"){
      //  router.push
      // }

      router.push("/");
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/logout`, {}, { withCredentials: "true" });
      setAuth(null);
      router.push("/");
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginData,
    changeHandler,
    Login,
    Logout,
  };
};
