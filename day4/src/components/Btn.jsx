import React from "react";

const Btn = ({ onClickFunc, children }) => {
  return (
    <span onClick={onClickFunc} role="button" style={{ backgroundColor: "#5D3587" }} className="rounded p-2 border mt-3 text-white">
      {children}
    </span>
  );
};

export default Btn;
