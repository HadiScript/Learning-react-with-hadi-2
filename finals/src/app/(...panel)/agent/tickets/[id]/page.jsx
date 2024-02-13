'use client'

import { useComments } from "@/actions/comments";
import { useSingleTicket } from "@/actions/tickets";
import Heading from "@/components/common/Heading"
import CommentSection from "@/components/common/comments";
import SingleTcDesc from "@/components/ticket/single-tc-desc";
import { ShoppingBag } from "react-feather"

const TicketDetail = ({ params }) => {
  const { id } = params;
  const { ticket, loading } = useSingleTicket(id)
  const { loading: commentLoading, list, agentComments, deleteComment, comment, setComment } = useComments(id);
  return (
    <>
      <Heading title={ticket.title} icon={<ShoppingBag size={50} className="heading" />} />

      <SingleTcDesc data={ticket} loading={loading} />

      <CommentSection loading={commentLoading} list={list} doComment={agentComments} deleteComment={deleteComment} comment={comment} setComment={setComment} />

    </>
  )
}

export default TicketDetail