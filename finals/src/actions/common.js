"use client";

import axios from "axios";
import { useState } from "react";
import { API } from "./api";
import { Errs } from "@/helpers/Errs";
import { useRouter } from "next/navigation";

const initValues = {
  name: "",
  email: "",
  password: "",
};

export const useCommon = () => {
  const [loginData, setLoginData] = useState(initValues);
  const [loading, setLoading] = useState(false);

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
  };
};
