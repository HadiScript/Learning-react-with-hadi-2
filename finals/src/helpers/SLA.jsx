import { useEffect, useState } from 'react'

const SLA = (time) => {

  const [starter, setStarter] = useState(() => {
    const diff = new Date() - new Date(time); // mili sec
    return Math.floor(diff / 1000); //convert sec
  });

  useEffect(() => {
    const _timers = setInterval(() => {
      setStarter((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(_timers);
  }, []);

  const formatToMinutes = (sec) => {
    let min = Math.floor(sec / 60);
    let seconds = sec % 60;

    return <span className={`${starter >= 600 ? "text-danger" : ""}`}>{min.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>;
  };


  return formatToMinutes(starter)
}

export default SLA