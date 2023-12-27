// import React, { useEffect, useState } from "react";

// const Main = () => {
//   // useEffect( ()=>{}, [] ) //syntax

//   const [A, setA] = useState(1);
//   const [B, setB] = useState(1);

//   // useEffect(() => {
//   //   console.log("am here");
//   // }); // without []
//   // // first time call
//   // // jab bhi component update -> call

//   // useEffect(() => {
//   //   console.log("am here");
//   // }, []); //first time call

//   useEffect(() => {
//     console.log("am here");
//   }, [B]); //first time call, B-> Change B

//   return (
//     <div>
//       A : {A}
//       <br />
//       <button onClick={() => setA(A + 1)}>Inc A</button>
//       <hr />B : {B}
//       <br />
//       <button onClick={() => setB(B + 1)}>Inc A</button>
//     </div>
//   );
// };

// export default Main;

import React, { useEffect, useState } from "react";
import CompoA from "./CompoA";

const Main = () => {
  const [showCompoA, setShowCompoA] = useState(true);

  useEffect(()=>{     // its will never be async function
    // fetching api....
 
  },[])

  return (
    <div>
      Main
      <br />
      {showCompoA && <CompoA />}
      <button onClick={() => setShowCompoA(!showCompoA)}> toggle Compo A </button>
    </div>
  );
};

export default Main;
