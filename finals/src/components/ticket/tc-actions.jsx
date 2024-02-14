'use client'
import { useRouter } from 'next/navigation'
import CircleLoader from '../common/CircleLoader'
import { ResolveTickets } from '@/actions/tickets'

const ItsBtn = ({ onClick, isLoading, children, danger, }) => {
  return <button onClick={onClick} type="submit" className={`${danger ? "myBtnDanger" : "myBtnSecondary"} mt-3`}>
    {isLoading ? <CircleLoader /> : children}
  </button>
}

const TcActions = ({ id, setWhichModal }) => {

  const router = useRouter()

  return (
    <div className='d-flex justify-content-end flex-wrap align-items-center gap-4'>
      <ItsBtn onClick={() => setWhichModal('escalate')} danger={true}>Escalate</ItsBtn>
      <ItsBtn onClick={() => setWhichModal('handover')} danger={true}>Handover</ItsBtn>


      <ItsBtn onClick={() => {
        ResolveTickets(id);
        router.push('/agent/tickets/resolved')
      }} danger={false}>Resolved</ItsBtn>
    </div>
  )
}

export default TcActions