"use client";

import Heading from "../../../../../components/common/Heading";
import { AgentTcTable } from "../../../../../components/common/TcTable";
import { ticketdata } from "../../../../../data";
import React, { useEffect, useState } from "react";
import { Search, ShoppingBag } from "react-feather";

const Bucket = () => {
  const [search, setSearch] = useState("");
  const [openTickets, setopenTickets] = useState(ticketdata.filter((x) => x.status === "Open"));

  // Function to filter tickets based on search input
  const filterTickets = () => {
    const filteredTickets = ticketdata.filter((ticket) => ticket.status === "Open" && ticket.title.toLowerCase().includes(search.toLowerCase()));
    setopenTickets(filteredTickets);
  };

  // Update openTickets when search or ticketdata changes
  useEffect(() => {
    filterTickets();
  }, [search, ticketdata]);
  return (
    <>
      <Heading title={"Bucket"} icon={<ShoppingBag size={50} className="heading" />} />

      <div className=" d-flex justify-content-start align-items-center gap-3 mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="myInput py-1 px-2" placeholder="Search by title" />
        <Search size={18} />
      </div>

      <AgentTcTable data={openTickets} from={"bucket"} />
    </>
  );
};

export default Bucket;
