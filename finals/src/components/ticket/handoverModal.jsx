import { useAvailableAgents } from '@/actions/tickets'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import CircleLoader from '../common/CircleLoader'
import { _useAuth } from '@/context/Auth'


const HandoverComponent = ({ loading, handoverTc, list, auth, ticketId }) => {
  return <>
    <Modal.Header closeButton>
      <Modal.Title>Available Agents {loading && "...."} </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {
        list?.filter(x => x._id !== auth?._id)?.map(x => <div className='d-flex justify-content-between align-items-center mb-3 ' key={x._id}>
          <b>{x.name}</b>
          <button className='myBtnDanger' onClick={() => handoverTc(ticketId, x._id)} >Handover</button>
        </div>)
      }
    </Modal.Body>
  </>
}

const EscComponent = ({ loading, why, setWhy, EscTicket }) => {
  return <>
    <Modal.Header closeButton>
      <Modal.Title>Escalate Ticket {loading && "...."} </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className='d-flex flex-column gap-2'>
        <textarea className='myInput2' value={why} onChange={e => setWhy(e.target.value)} />
        <button className='myBtnDanger' onClick={EscTicket}>{loading ? "loading..." : "Escalte"}</button>
      </div>
    </Modal.Body>
  </>
}

const HandoverModal = ({ open, setOpen, ticketId, from, why, setWhy, EscTicket }) => {

  const [auth] = _useAuth()
  const { loading, list, handoverTc } = useAvailableAgents(open)


  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      backdrop="static"
      keyboard={false}
      centered
    >

      {from === "handover" && <HandoverComponent list={list} loading={loading} auth={auth} handoverTc={handoverTc} ticketId={ticketId} />}
      {from === "escalate" && <EscComponent loading={loading} why={why} setWhy={setWhy} EscTicket={() => { why ? EscTicket(ticketId, why) : null }} />}

    </Modal>
  )
}

export default HandoverModal