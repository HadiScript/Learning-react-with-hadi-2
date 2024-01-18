import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Redirecting = () => {
  const [count, setCount] = useState(2);

  const router = useNavigate();

  useEffect(() => {
    const _interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) router("/");

    return () => clearInterval(_interval);
  }, [count]);

  return <p>please wait for {count} sec</p>;
};

export default Redirecting;
