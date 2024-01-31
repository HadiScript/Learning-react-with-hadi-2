import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import Crypto from "crypto-js";
import { useNavigate } from "react-router-dom";

let key = "heloBhai97Kiya98Hai99hei!sl";

export const _useLogin = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const router = useNavigate();

  const [loginData, setLoginData] = useState({ email: "clientA@gmail.com", password: "hadi.." });
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // login
  const submit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/signin", loginData);
      if (res.status === 200) {
        setAuth(res.data);
        Cookies.set("auth", Crypto.AES.encrypt(JSON.stringify(res.data), key).toString());
        // Cookies.set("auth", JSON.stringify(res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth");
    setAuth({
      user: null,
      token: "",
    });
    router("/");
  };

  return {
    changeHandler,
    submit,
    loginData,
    loading,
    logout,
  };
};
