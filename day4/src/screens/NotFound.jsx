import React from "react";
import { style } from "../config/CommonClasses";
import { Link, useNavigate } from "react-router-dom";
import Btn from "../components/Btn";

const NotFound = () => {

  const router = useNavigate()

  const backToHome = ()=> router('/')


  return (
    <div style={{ height: "100vh" }} className={`${style.flexCenter}`}>
    
      <div className={style.flexCol}>
    
        <span className="display-4"> Not Found :(</span>
        
        {/* <span onClick={backToHome} role="button" style={{ backgroundColor: "#5D3587" }} className="rounded p-2 border mt-3 text-white">
          Go back to home page
        </span> */}

        <Btn onClickFunc={backToHome} >  Go back to home page </Btn>

        {/* using Link */}
        {/* <Link to={'/'} onClick={backToHome} role="button" style={{ backgroundColor: "#5D3587", textDecoration : "none" }} className="rounded p-2 border mt-3 text-white">
          Go back to home page
        </Link> */}

      </div>
    
    </div>
  );
};

export default NotFound;
