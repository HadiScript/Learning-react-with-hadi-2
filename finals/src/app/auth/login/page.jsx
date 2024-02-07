"use client";

import { useCommon } from "@/actions/common";
import Link from "next/link";
import React from "react";
import { LogIn } from "react-feather";

const Login = () => {
  const { loading, loginData, Login, changeHandler } = useCommon();

  return (
    <div style={{ minHeight: "100vh" }} className="d-flex flex-column gap-3 justify-content-center align-items-center">
      <div style={{ minWidth: "360px" }} className="border rounded-3 p-3 ">
        <div className="d-flex mb-3 gap-3 align-items-center" style={{ fontSize: "30px" }}>
          <LogIn /> Login
        </div>

        <form onSubmit={Login}>
          <div className="form-group mb-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input value={loginData.email} name="email" onChange={changeHandler} type="email" className="form-control myInput" />
            <small className="form-text text-secondary">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input value={loginData.password} name="password" onChange={changeHandler} type="password" className="form-control myInput" />
          </div>

          <button type="submit" className="myBtnSecondary mt-3">
            {loading ? "please wait..." : " Submit"}
          </button>
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
