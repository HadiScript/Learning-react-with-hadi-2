import React from "react";

const From1 = () => {
  return <p>ajshdkashdkjashdkjashdkajsdh</p>;
};

const From = (props) => {
  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
   
      {props.children} {props.aaaa}
      <From1 />
     
    </div>
  );
};

const AppProps2 = () => {
  return (
    <div>
      <From aaaa={"hadi raza"}>kashdkjhasdkjhsadkjsahd </From>
      <From1 />
    </div>
  );
};

export default AppProps2;
