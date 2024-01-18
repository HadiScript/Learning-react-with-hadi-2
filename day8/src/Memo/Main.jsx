import React, { memo, useMemo, useState } from "react";
import CompoA from "./CompoA";

const Main = () => {
  const [a, setA] = useState(0);


  // useMemo
  // const memoCompo = memo(()=>{
  //   return <CompoA />
  // }, [])

  // cal

  return (
    <div>
      Main State : {a}
      <br />
      <button onClick={()=>setA(a+1)}>INc</button>
     
      <br />
      <br />


      <CompoA />

      <br/>
      <br/>
      <br/>
      <br/>

      {/* {memoCompo} */}
    </div>
  );
};

export default Main;
