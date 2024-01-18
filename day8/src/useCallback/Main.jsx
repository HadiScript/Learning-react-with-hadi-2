// useContext+useReducer
// useRef -> dom
// useMemo

import React, { useCallback, useState } from "react";

const myset = new Set();

const Main = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const incA = useCallback(() => {
    setA(a + 1);
  }, [a]);

  const incB = useCallback(() => {
    setB(b + 1);
    // 100 lines
  }, [b]);

  myset.add(incA);
  myset.add(incB);

  console.log(myset);

  return (
    <div>
      A : {a}
      <button onClick={incA}>inc A</button>
      <hr />B : {b}
      <button onClick={incB}>inc B</button>
    </div>
  );
};

export default Main;
