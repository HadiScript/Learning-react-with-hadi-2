import React, { useState } from "react";

import PanelHeading from "../../components/PanelHeading";
import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons";
import { __useOpenTickets } from "../../../logic/actions/_client-ticket";
import { Link } from "react-router-dom";

const ClientOpenTickets = () => {
  const { loading, list } = __useOpenTickets();

  return (
    <>
      <PanelHeading icon={<FolderOpenOutlined className="its-icon" />} title={"Open Request"} />

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"># {loading && "..."}</th>
              <th scope="col">Title</th>
              <th scope="col">Priority</th>
              <th scope="col">Category</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list?.map((x, index) => (
              <tr key={x._id}>
                <th scope="row">{++index}</th>
                <td>{x.title}</td>
                <td>{x.priority}</td>
                <td>{x.category.name}</td>
                <td>{x.status}</td>
                <td role="button">
                  <Link to={`/_/request-detail/${x._id}`}>
                    <FolderOpenOutlined />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientOpenTickets;
