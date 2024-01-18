import { Button } from "antd";
import React, { useEffect, useState } from "react";

const AgentBucketRow = ({ x, index, pickAnTicket }) => {
  const [starter, setStarter] = useState(() => {
    const diff = new Date() - new Date(x.createdAt); // mili sec
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

    return `${min.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <tr key={index}>
        <th>{++index}</th>
        <th>{x.title}</th>
        <th>{x.category}</th>
        <th>{x.priority}</th>
        <th>{x.createdAt.slice(0, 10)}</th>
        <th>
          <span className={`${starter >= 600 && "text-danger"}`}>{formatToMinutes(starter)}</span>
        </th>
        <th>
          <Button onClick={() => pickAnTicket(x._id)} size="small" type="dashed">
            Pick Ticket
          </Button>
        </th>
      </tr>
    </>
  );
};

export default AgentBucketRow;
