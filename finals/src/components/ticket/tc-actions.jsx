import React from 'react'
import CircleLoader from '../common/CircleLoader'

const ItsBtn = ({ onClick, isLoading, children, danger }) => {
  return <button onClick={onClick} type="submit" className={`${danger ? "myBtnDanger" : "myBtnSecondary"} mt-3`}>
    {isLoading ? <CircleLoader /> : children}
  </button>
}

const TcActions = () => {
  return (
    <div className='d-flex justify-content-end flex-wrap align-items-center gap-4'>
      <ItsBtn danger={true}>Escalate</ItsBtn>
      <ItsBtn danger={true}>Handover</ItsBtn>
      <ItsBtn danger={false}>Resolved</ItsBtn>
    </div>
  )
}

export default TcActions