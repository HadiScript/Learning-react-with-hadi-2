import React from "react";
import { usePickTickets } from "../../../logic/actions/_agent";
import PanelHeading from "../../components/PanelHeading";
import { use2ndSLA } from "../../../logic/hook/use2ndSla";
import AgentPickedRow from "../../components/AgentPickedRow";

const PickTickets = () => {
  const { loading, list } = usePickTickets();

  return (
    <>
      <PanelHeading title={"List of my picks"} />

      <div className="table-responsive">
        <table className="table mt-3 agent-table">
          <thead>
            <tr>
              <th scope="col"># {loading && "loading"}</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col ">1st SLA</th>
              <th scope="col ">2nd SLA</th>
              <th scope="col "></th>
            </tr>
          </thead>

          <tbody>
            {list?.map((x, index) => (
              <AgentPickedRow x={x} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PickTickets;
