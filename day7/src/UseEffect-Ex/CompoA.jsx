import React, { useEffect, useState } from "react";

const CompoA = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // const meraMouse = (e) => {
  //   console.log("mouse is moving");
  //   setX(e.clientX);
  //   setY(e.clientY);
  // };

  // useEffect(() => {
  //   window.addEventListener("mousemove", meraMouse);

  //   return () => {
  //     window.removeEventListener("mousemove", meraMouse);
  //   };
  // }, []);

  // 50ms
  // const fetchingDataFromBackend = (e) => {};

  // useEffect(() => {
  //   // window.addEventListener("mousemove", meraMouse);
  //   fetchingDataFromBackend();

  //   return () => {};
  // }, []);

  // const windowWidth = (e) => {
  //   console.log("window");
  //   setX(e.clientX);
  //   setY(e.clientY);
  // };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const _resize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", _resize);

    return () => {
      window.removeEventListener("resize", _resize);
    };
  }, []);

  return (
    <div>
      width : {width}
      <br />
      {width < 388 && <button>Just for mobile</button>}
    </div>
  );
};

export default CompoA;
