import React, { useContext } from "react";
import { AuthContext } from "../Main";

const Login = () => {
  const [count, setCount] = useContext(AuthContext);

  return <div>Login</div>;
};

export default Login;
