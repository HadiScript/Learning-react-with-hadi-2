import { useEffect, useState } from "react";

export const use2ndSLA = (x) => {
  const [starter, setStarter] = useState(() => {
    const diff = new Date() - new Date(x); // mili sec
    return Math.floor(diff / 1000); //convert sec
  });

  useEffect(() => {
    const _timers = setInterval(() => {
      setStarter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(_timers);
  }, []);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  return formatTime(starter);
};
