import React, { createContext, useState } from "react";
import A from "./Compo/A";
import B from "./Compo/B";
import C from "./Compo/C";

export const FatherBank = createContext()
export const FatherBank2 = createContext()

const Main = () => {
  const [money, setMoney] = useState(100)
  const [moneyDouble, setMoneyDouble] = useState(5)

  return <div>Main

    <br/>
    <br/>


  <FatherBank.Provider value={[money, setMoney]}>

    <FatherBank2.Provider value={{moneyDouble, setMoneyDouble}}>
    <A />
    </FatherBank2.Provider>

  <br/>
  <B />

  <br/>
  <C />

  </FatherBank.Provider>


  </div>;
};

export default Main;
