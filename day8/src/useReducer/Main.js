// import React, { useState } from "react";
// import Counter from "./Counter";

// const initValue = 0;

// const Main = () => {
//   const [count, setCount] = useState(initValue);

//   const Inc = () => setCount(count + 1);
//   const Dec = () => setCount(count - 1);

//   const IncBy2 = () => setCount(count + 2);
//   const DecBy2 = () => setCount(count - 2);

//   return <Counter
//             Inc={Inc}
//             Dec={Dec}
//             IncBy2={IncBy2}
//             DecBy2={DecBy2}
//             counter={count}
//          />;
// };

// export default Main;

import React, { useState, useReducer } from "react";

let initState = 100;

const ReducerFunc = (state, action) => {
  if (action.type === "inc") {
    return state + action.payload.value;
  } else if (action.type === "dec") {
    return state - action.payload.value;
  }
};

const Main = () => {
  const [state, dispatch] = useReducer(ReducerFunc, initState);

  return (
    <div>
      <h5>useReducer</h5>
      <br />
      useReducer State : {state}
      <button onClick={() => dispatch({ type: "inc", payload: { value: 100 } })}>Inc</button>
      <button onClick={() => dispatch({ type: "dec", payload: { value: 100 } })}>Dec</button>
    </div>
  );
};

export default Main;
