'use client'

import { useResolvedTickets } from "@/actions/tickets";
import Heading from "@/components/common/Heading";
import { _useAuth } from "@/context/Auth";
import React from "react";
import { Check } from "react-feather";
import { Bars } from "react-loader-spinner";

const ResolvedTickets = () => {

  const [auth] = _useAuth()
  const { list, loading } = useResolvedTickets();


  return <>


    <Heading title={"All Resolved Tickets"} icon={<Check size={50} className="heading" />} />
    <div class="table-responsive">
      <table class="table" id="tcTable">
        <thead>
          <tr>
            <th scope="col">
              {
                loading ? <Bars
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                /> : "#"
              }
            </th>
            <th scope="col">title</th>
            <th scope="col">Prioity</th>
            <th scope="col">Created At</th>
            <th scope="col">Resolved At</th>
            <th scope="col">Picked By</th>
          </tr>
        </thead>
        <tbody>
          {list?.map((x, index) => (
            <tr>
              <th scope="row">{++index}</th>
              <td>{x.title}</td>
              <td>{x.priority}</td>
              <td>{x.createdAt?.slice(0, 10)}</td>
              <td>{x.resolvedAt?.slice(0, 10)}</td>
              <td>{x.pickedBy === auth._id ? "me" : x.pickedBy}</td>


              <td>
                {/* {from === "bucket" ? <ExternalLink size={17} onClick={() => onClick(x._id)} /> : <ExternalLink size={17} onClick={() => router.push(`/agent/tickets/${x._id}`)} />} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>



  </>;
};

export default ResolvedTickets;
