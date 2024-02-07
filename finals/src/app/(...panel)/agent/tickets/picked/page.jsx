import React from "react";
import { Terminal } from "react-feather";
// import Heading from "../../../../../components/common/Heading";
import Heading from "@/components/common/Heading";

const PickedTickets = () => {
  return (
    <>
      <Heading title={"Picked Tickets"} icon={<Terminal size={50} className="heading" />} />
    </>
  );
};

export default PickedTickets;
