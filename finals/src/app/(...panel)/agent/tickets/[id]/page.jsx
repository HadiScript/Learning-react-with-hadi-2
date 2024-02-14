'use client'

import { useComments } from "@/actions/comments";
import { useSingleTicket } from "@/actions/tickets";
import Heading from "@/components/common/Heading"
import CommentSection from "@/components/common/comments";
import DetailTickets from "@/components/ticket/detail-tickets";
import HandoverModal from "@/components/ticket/handoverModal";
import SingleTcDesc from "@/components/ticket/single-tc-desc";
import TcActions from "@/components/ticket/tc-actions";
import { useEffect, useState } from "react";
import { ShoppingBag } from "react-feather"

const TicketDetail = ({ params }) => {
  const { id } = params;
  const { ticket, loading, EscTicket } = useSingleTicket(id) // 




  return (
    <>
      <DetailTickets from="picked" id={id} ticket={ticket} loading={loading} EscTicket={EscTicket} />
    </>
  )
}

export default TicketDetail