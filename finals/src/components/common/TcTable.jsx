'use client'

import SLA from "@/helpers/SLA";
import { useRouter } from "next/navigation";
import React from "react";
import { ExternalLink } from "react-feather";
import { Bars } from "react-loader-spinner";

export const AgentTcTable = ({ from, data, loading, onClick }) => {
  const router = useRouter()

  return (
    <div class="table-responsive">
      <table class="table" id="tcTable">
        <thead>
          <tr>
            <th scope="col">{loading ? <Bars
              height="20"
              width="20"
              color="white"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> : "#"}</th>
            <th scope="col">title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Prioity</th>
            <th scope="col">First SLA</th>
            {from === 'picked-tickets' && <th>Second Sla</th>}
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
              <td>{from === 'bucket' ? SLA(x.createdAt) : 'yes'}</td>
              {from === 'picked-tickets' && <td>{SLA(x.pickedAt)}</td>}

              <td>
                {from === "bucket" ? <ExternalLink size={17} onClick={() => onClick(x._id)} /> : <ExternalLink size={17} onClick={() => router.push(`/agent/tickets/${x._id}`)} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
