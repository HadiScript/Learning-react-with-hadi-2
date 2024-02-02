import Heading from "@/components/common/Heading";
import React from "react";
import { Cast } from "react-feather";

const AllTickets = () => {
  return (
    <>
      <Heading title={"Assign Tickets"} icon={<Cast size={50} className="heading" />} />
    </>
  );
};

export default AllTickets;
