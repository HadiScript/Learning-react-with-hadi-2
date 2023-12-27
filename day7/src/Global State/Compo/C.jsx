import React, { useContext } from "react";
import { FatherBank } from "../Main";

const C = () => {
  const [money, setMoney] = useContext(FatherBank);

  return <div>C - {money} - <button onClick={()=>setMoney(money+100)}>Do something</button></div>;
};

export default C;
