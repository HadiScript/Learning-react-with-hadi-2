import React from "react";
import { __useGetList } from "../../../logic/actions/_client-ticket";
import PanelHeading from "../../components/common/PanelHeading";
import TicketTable from "../../components/common/TicketTable";

const HandoverTc = () => {
  const { loading, list } = __useGetList("ticket/handover-to-me");
  return (
    <>
      <PanelHeading title={"Handover to me"} />

      <TicketTable list={list} loading={loading} from={"handover-tickets"} />
    </>
  );
};

export default HandoverTc;
