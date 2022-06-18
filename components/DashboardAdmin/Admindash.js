import React from 'react'
import BarChart from './BarChart'
import dash from  './dash.module.css'
import PieChart from './PieChart'

const AdminDash = () => {
  const dummyData = {
    total: 100,
    male: 60,
    female: 40,
    name: 'Yash',
    class: 12,
    rollno: 5,
    section: 'A',
    id: 73829,
  }

  return (
    <>
      <div className={dash.heading1}>
        <h2>Total Number of Students</h2>
      </div>
      <div className={dash.dash_container}>

        <div className={dash.pie} style={{color:"white" }}>
          <div className={dash.heading} style={{color:"white" }}>
            <p>Total Number Of Male And Female Students</p>
          </div>
          <div className={dash.content1}>
            <div className={dash.labels}>
              <h5>Male Students : {dummyData.male} </h5>
              <h5>Female Students : {dummyData.female} </h5>
            </div>
            <div className={dash.piechart} >
              <PieChart total={dummyData.total} male={dummyData.male} female={dummyData.female} />
            </div>
          </div>
        </div>

        <div className={dash.bar}>
          <BarChart />
        </div>
      </div>
    </>
  )
}

export default AdminDash
