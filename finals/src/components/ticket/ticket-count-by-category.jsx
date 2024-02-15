'use client'


import { getTicketByCategoryCount } from '@/actions/admin';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircleLoader from '../common/CircleLoader';

const TicketCountByCategory = () => {

  const { loading, list } = getTicketByCategoryCount();





  return (
    <div style={{ width: '100%', height: 300 }}>

      {loading ? <CircleLoader /> : <ResponsiveContainer >
        <BarChart
          width={200}
          height={300}
          data={list}
          margin={{
            top: 30,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >

          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ticketCount" fill="#8884d8" width={"10px"} />

        </BarChart>
      </ResponsiveContainer>}

    </div>
  )
}

export default TicketCountByCategory