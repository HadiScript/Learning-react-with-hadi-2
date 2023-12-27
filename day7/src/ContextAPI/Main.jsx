import React, { createContext } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";

export const AuthContext = createContext();

const Main = () => {
  const [count, setCount] = useState(0);

  return <AuthContext.Provider value={[count, setCount]}>

      <Login />
      <Home />
      <MyProfile />


  </AuthContext.Provider>;
};

export default Main;
