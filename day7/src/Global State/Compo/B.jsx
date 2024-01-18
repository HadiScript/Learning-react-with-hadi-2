import React, { useContext } from "react";
import { FatherBank } from "../Main";

const B = () => {
  const [money, setMoney] = useContext(FatherBank);

  return <div>B - {money} - <button onClick={()=>setMoney(money-100)}>Do something</button></div>;
};

export default B;
