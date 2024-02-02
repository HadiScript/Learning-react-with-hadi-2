import React from "react";
import { ExternalLink } from "react-feather";

export const AgentTcTable = ({ from, data }) => {
  return (
    <div class="table-responsive">
      <table class="table" id="tcTable">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Prioity</th>
            <th scope="col">First SLA</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((x, index) => (
            <tr>
              <th scope="row">{++index}</th>
              <td>{x.title}</td>
              <td>{x.description}</td>
              <td>{x.category}</td>
              <td>{x.priority}</td>
              <td>{x.firstSLABreach ? "yes" : "timer"}</td>
              <td>
                <ExternalLink size={17} onClick={() => {}} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
