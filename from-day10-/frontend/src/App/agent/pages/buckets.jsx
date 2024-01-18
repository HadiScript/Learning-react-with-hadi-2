import React from "react";
import PanelHeading from "../../components/PanelHeading";
import { useBucket } from "../../../logic/actions/_agent";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import AgentBucketRow from "../../components/AgentBucketRow";

const Buckets = () => {
  const { loading, list, fetchOpenTickets, pickAnTicket } = useBucket();

  //  list length -> useState

  return (
    <>
      <PanelHeading title={"Bucket"} />

      <div className="d-flex justify-content-end">
        <Button icon={<ReloadOutlined />} onClick={fetchOpenTickets}>
          Reload
        </Button>
      </div>

      <small>Red background means, 1st SLA has breached</small>

      <div className="table-responsive">
        <table className="table mt-3 agent-table">
          <thead>
            <tr>
              <th scope="col"># {loading && "loading"}</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">Priority</th>
              <th scope="col">Created At</th>
              <th scope="col ">Timer</th>
            </tr>
          </thead>

          <tbody>
            {list?.map((x, index) => (
              <AgentBucketRow x={x} index={index} pickAnTicket={pickAnTicket} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Buckets;
