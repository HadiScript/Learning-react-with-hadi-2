import React, { useEffect, useState } from "react";

const UseEffectApp = () => {
  const [first, setFirst] = useState(0);
  const [first1, setFirst1] = useState(0);

  useEffect(() => {
    console.log("in useffect");
  }, [first1]);

  // empty -> first render -> component borning stage
  // dep -> dep change -> useEffect chale ga

  return (
    <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center bg-dark">
      hadi raza
      <button onClick={() => setFirst(first + 1)}>{first}</button>
      <br />
      <button onClick={() => setFirst1(first1 + 1)}>{first1}</button>
    </div>
  );
};

export default UseEffectApp;
