import React, {useState} from "react";

export const MainHeader = (props) => {
  const {hadiraza} = props

  return <div className="topheader">
  
    <h5>Main Heading</h5> 
    <span>{hadiraza}</span>
  
  </div>;
};

const AppProps = () => {

  const [title, settitle] = useState("Day 1 with Hadi Raza")

  return <>
  
  <MainHeader hadiraza={title} />
  
  
  </>
};

export default AppProps;
