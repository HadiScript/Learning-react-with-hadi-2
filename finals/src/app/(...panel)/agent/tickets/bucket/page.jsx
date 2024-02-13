'use client'

import { useBucket } from "@/actions/tickets";
import Heading from "../../../../../components/common/Heading";
import { AgentTcTable } from "../../../../../components/common/TcTable";
import { ShoppingBag } from "react-feather";

const Bucket = () => {
  const { list, loading, pickAnTicket } = useBucket();

  return (
    <>
      <Heading title={"Bucket"} icon={<ShoppingBag size={50} className="heading" />} />
      <AgentTcTable data={list} from={"bucket"} loading={loading} onClick={pickAnTicket} />
    </>
  );
};

export default Bucket;
