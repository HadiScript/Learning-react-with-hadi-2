import React, { useContext } from "react";
import { AuthContext } from "../../../logic/context/AuthContext";
import { Link } from "react-router-dom";
import { _useLogin } from "../../../logic/actions/_common";

const Home = ({ user }) => {
  const [auth] = useContext(AuthContext);
  const { logout } = _useLogin();

  const role = auth?.user?.role;

  return (
    <div>
      {user}
      {auth?.token ? (
        <div>
          {role === "client" ? (
            <Link to={"/_/open-requests"}>Client Dashboard</Link>
          ) : role === "agent" ? (
            <Link to={"/agent/bucket"}>Agent dashboard</Link>
          ) : role === "admin" ? (
            <button>Admin Dashboard</button>
          ) : (
            ""
          )}

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button>
          <Link to={"/login"}>Login</Link>
        </button>
      )}
    </div>
  );
};

export default Home;
