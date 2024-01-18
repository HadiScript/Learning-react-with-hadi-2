import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import Crypto from "crypto-js";
import axios from "axios";

let key = "heloBhai97Kiya98Hai99hei!sl";

export const AuthContext = createContext();

export const _useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    let user = Cookies.get("auth");

    let hi;
    if (user) {
      hi = Crypto.AES.decrypt(user, key);
      if (hi) {
        setAuth(JSON.parse(hi.toString(Crypto.enc.Utf8)));
      }
    }
  }, []);

  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.headers.common["Cookies"] = auth.token;

  return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
