// import React from 'react'
// import Layouts from './component/Layouts'

// const App = () => {
//   return (
//     <Layouts>laskhlkashdlkashdlkasdhlkashlkadshlksadh</Layouts>
//   )
// }

// export default App

import React, { useEffect, useState } from "react";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [show, setShow] = useState(true);

  const recordMouse = (e) => {
    setX(e.clientX);
    setY(e.clientY);
  };

  console.log("mouse movinges");

  useEffect(() => {
    window.addEventListener("mousemove", recordMouse);
  }, []);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Hide</button>
      {show && (
        <p>
          X: {x} - Y : {y}
        </p>
      )}
    </div>
  );
};

export default App;
