import React from "react";
import { usePickTickets } from "../../../logic/actions/_agent";
import PanelHeading from "../../components/common/PanelHeading";
import TicketTable from "../../components/common/TicketTable";

const PickTickets = () => {
  const { loading, list } = usePickTickets();

  return (
    <>
      <PanelHeading title={"List of my picks"} />

      <TicketTable list={list} loading={loading} from={"picked-ticket"} />
    </>
  );
};

export default PickTickets;
