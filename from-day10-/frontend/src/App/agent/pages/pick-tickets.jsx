import React from "react";
import { usePickTickets } from "../../../logic/actions/_agent";

const PickTickets = () => {
  const { loading, list } = usePickTickets();

  return <div>{JSON.stringify(list)}</div>;
};

export default PickTickets;
