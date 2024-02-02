import Heading from "@/components/common/Heading";
import React from "react";
import { Wind } from "react-feather";

const HandoverTickets = () => {
  return (
    <>
      <Heading title={"Handover Tickets"} icon={<Wind size={50} className="heading" />} />
    </>
  );
};

export default HandoverTickets;
