"use client"


import { ShoppingBag } from "react-feather"
import Heading from "../common/Heading"
import CommentSection from "../common/comments"
import HandoverModal from "./handoverModal"
import SingleTcDesc from "./single-tc-desc"
import TcActions from "./tc-actions"
import { useComments } from "@/actions/comments"
import { useEffect, useState } from "react"

const DetailTickets = ({ id, EscTicket, ticket, loading }) => {
  const { loading: commentLoading, list, agentComments, deleteComment, comment, setComment } = useComments(id);



  const [whichModal, setWhichModal] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const [why, setWhy] = useState(""); // reason

  useEffect(() => {
    if (whichModal) {
      setOpenModal(true)
    }

  }, [whichModal])

  return (
    <>
      <Heading title={ticket.title} icon={<ShoppingBag size={50} className="heading" />} />

      <TcActions id={id} setWhichModal={setWhichModal} />

      <SingleTcDesc data={ticket} loading={loading} id={id} />

      <CommentSection loading={commentLoading} list={list} doComment={agentComments} deleteComment={deleteComment} comment={comment} setComment={setComment} />


      {/* modals */}
      <HandoverModal open={whichModal} setOpen={setWhichModal} ticketId={id} from={whichModal} why={why} setWhy={setWhy} EscTicket={EscTicket} />


    </>
  )
}

export default DetailTickets