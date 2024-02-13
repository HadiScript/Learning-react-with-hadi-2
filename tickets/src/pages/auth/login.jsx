import { useCommon } from "@/actions/common"
import Link from "next/link"
import { LogIn } from "react-feather"

const Login = () => {
  const { loginData, loading, Login, changeHandler } = useCommon();
  return (
    <div style={{ minHeight: "100vh" }} className="d-flex flex-column gap-3 justify-content-center align-items-center">

      <div style={{ minWidth: "360px" }} className="border rounded-3 p-3 ">
        <div className="d-flex mb-3 gap-3 align-items-center" style={{ fontSize: "30px" }}>
          <LogIn /> Login
        </div>

        <form onSubmit={Login}>
          <div className="form-group mb-2">
            <label >Email address</label>
            <input onChange={changeHandler} value={loginData.email} name="email" type="email" className="form-control myInput" />
            <small className="form-text text-secondary">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label >Password</label>
            <input onChange={changeHandler} value={loginData.password} name="password" type="password" className="form-control myInput" />
          </div>

          <button type="submit" className="myBtnSecondary mt-3">
            Submit
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
  )
}

export default Login