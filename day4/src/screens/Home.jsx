import React from "react";
import { style } from "../config/CommonClasses";
import TopHeader from "../components/TopHeader";
import Btn from "../components/Btn";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const router = useNavigate();

  const toAbout = ()=> router('/about')

  return (
    <>
      <TopHeader />
      <div style={{ height: "100vh" }} className={`${style.flexCenter}`}>
        <div className={style.flexCol}>
          <span className="display-1">Home Page</span>

          <Btn onClickFunc={toAbout}> About </Btn>
        </div>
      </div>
    </>
  );
};

export default Home;
