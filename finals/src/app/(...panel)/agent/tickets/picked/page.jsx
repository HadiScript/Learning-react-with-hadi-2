'use client'

import React from "react";
import { Terminal } from "react-feather";
// import Heading from "../../../../../components/common/Heading";
import Heading from "@/components/common/Heading";
import { usePickTickets } from "@/actions/tickets";
import { AgentTcTable } from "@/components/common/TcTable";

const PickedTickets = () => {
  const { list, loading } = usePickTickets()


  return (
    <>
      <Heading title={"Picked Tickets"} icon={<Terminal size={50} className="heading" />} />
      <AgentTcTable data={list} loading={loading} from={"picked-tickets"} />
    </>
  );
};

export default PickedTickets;
