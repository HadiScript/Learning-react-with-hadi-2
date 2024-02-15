'use client'


import { getTicketSummary } from "@/actions/admin"
import CircleLoader from "../common/CircleLoader";

const TicketSummary = () => {

  const { loading, data } = getTicketSummary();


  // allInProgressTicketCount
  // allOpenTicketCount
  // allResolvedTicketCount
  // allTicketCount
  // mostReopenTicketCount


  return (
    <div className="d-flex flex-column align-items-start justify-content-center gap-2">
      {
        (!data || loading) ? <CircleLoader /> : Object.keys(data).map((x, index) => <div key={index} className="d-flex align-items-center"> <b>{x}</b>: {data[x]} </div>)
      }
    </div>
  )
}

export default TicketSummary