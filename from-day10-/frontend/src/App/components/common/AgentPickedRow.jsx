import React from "react";
import { use2ndSLA } from "../../../logic/hook/use2ndSla";
import { FolderOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const AgentPickedRow = ({ x, index, from }) => {
  const time = use2ndSLA(x.pickedAt);
  const router = useNavigate();

  const path = useLocation().pathname;

  return (
    <tr>
      <td scope="row">{++index}</td>
      <td scope="row">{x.title}</td>
      <td scope="row">{x.category}</td>
      <td scope="row">{x.priority}</td>
      <td scope="row">{x.createdAt.slice(0, 10)}</td>
      <td scope="row">{x.firstSLABreach ? <span className="breached px-3">Yes</span> : "-"}</td>
      <td scope="row">
        <span className={` text-center px-3`}>
          {time}
          {/* {from !== "handoverTc" && from !== "assignTc" ? elapsedTime : x.secondSLABreach ? <span className="breached px-3">Yes</span> : "-"} */}
        </span>
      </td>
      <td onClick={() => router(!path.includes("handover") ? `/agent/detail/${x._id}` : `/agent/handover/detail/${x._id}`)}>
        <FolderOutlined />
      </td>
    </tr>
  );
};

export default AgentPickedRow;
