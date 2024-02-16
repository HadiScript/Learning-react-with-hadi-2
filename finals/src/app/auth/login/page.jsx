"use client";

import { useCommon } from "@/actions/common";
import FormButton from "@/components/common/FormButton";
import { _useAuth } from "@/context/Auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogIn } from "react-feather";

const Login = () => {
  const { loading: authloading, loginData, Login, changeHandler } = useCommon();
  const [auth, setAuth, loading] = _useAuth();



  return !loading && auth ? redirect('/') : (
    <div style={{ minHeight: "100vh" }} className="d-flex flex-column gap-3 justify-content-center align-items-center">

      <div style={{ minWidth: "360px" }} className="border rounded-3 p-3 ">
        <div className="d-flex mb-3 gap-3 align-items-center" style={{ fontSize: "30px" }}>
          <LogIn /> Login
        </div>

        <form onSubmit={Login}>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input value={loginData.email} onChange={changeHandler} name="email" type="email" className="form-control myInput" />
            <small className="form-text text-secondary">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input value={loginData.password} onChange={changeHandler} name="password" type="password" className="form-control myInput" />
          </div>

          <div className="text-center">   <FormButton isLoading={authloading} type={"submit"}>Login</FormButton></div>
        </form>
      </div>

      <p>
        Have account?
        <Link className="_link" href={"/signup"}>
          create new account.
        </Link>
      </p>
    </div>
  );
};

export default Login;
