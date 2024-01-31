import React from "react";
import AgentPickedRow from "./AgentPickedRow";

const TicketTable = ({ list, loading, from }) => {
  return (
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
            <AgentPickedRow x={x} index={index} from={from} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
