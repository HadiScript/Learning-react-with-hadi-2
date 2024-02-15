'use client'

import { getAgentSummary } from "@/actions/admin";
import CircleLoader from "../common/CircleLoader";



const AgentSummary = () => {
  const { loading, data } = getAgentSummary()


  return loading ? <CircleLoader /> : <>
    <div class="table-responsive">
      <table class="table" id="tcTable">
        <thead>
          <tr>
            <th scope="col">"#"</th>
            <th scope="col">Name</th>
            <th scope="col">Resolved </th>
            <th scope="col">Picked</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((x, index) => (
            <tr key={index}>
              <th scope="row">{++index}</th>
              <td>{x.userInfo.name}</td>
              <td>{x.resolvedTickets}</td>
              <td>{x.pickedTickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
};


export default AgentSummary