import React, { useContext } from "react";
import { FatherBank2 } from "../Main";

const A = () => {
  const {moneyDouble, setMoneyDouble} = useContext(FatherBank2);


  return <div>A  - {moneyDouble} - <button onClick={()=>setMoneyDouble(moneyDouble-100)}>Do something</button></div>;
};

export default A;
