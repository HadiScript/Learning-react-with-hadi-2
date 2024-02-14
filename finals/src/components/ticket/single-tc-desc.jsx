'use client'

import { useState } from 'react'
import TcActions from './tc-actions'

const ItsBox = ({ title, value }) => {
  return <div className='d-flex flex-column p-2 px-3 rounded-2' style={{
    boxShadow: 'rgba(200, 200, 200, 0.15) 1.95px 1.95px 2.6px',
    // minWidth: '250px'
  }}>
    <b>{title}</b>
    <span>{value}</span>
  </div >
}



const SingleTcDesc = ({ from, data, id }) => {

  const [readmore, setReadmore] = useState(30)


  return (
    <div>
      {/* <TcActions id={id} /> */}

      <div className='d-flex justify-content-start flex-wrap align-items-center gap-4 my-3'>
        <ItsBox title={"Category"} value={data.category} />
        <ItsBox title={"Prority"} value={data.priority} />
        <ItsBox title={"Status"} value={data.status} />
        <ItsBox title={"Reopen Count"} value={data.reopenCount} />
        <ItsBox title={"Created At"} value={data.createdAt?.slice(0, 10)} />
        <ItsBox title={"Picked At"} value={data.pickedAt?.slice(0, 10)} />
        <ItsBox title={"First Sla"} value={data.firstSLABreach ? "yes" : "no"} />
        <ItsBox title={"Second Sla"} value={data.secondSLABreach ? "yes" : "no"} />
      </div>


      <div className="mt-4">
        <h3>Description</h3>
        <span>{data.description?.substring(0, readmore)} <i className='text-primary' onClick={() => setReadmore(1000)} role='button'>read more</i></span>
      </div>

    </div>
  )
}

export default SingleTcDesc