import React from "react";
import BarChart from "./BarChart";
import dash from "./dash.module.css";
import PieChart from "./PieChart";

import { useState, useEffect } from "react";
import { getGenderKPI } from "../../api/contractCall";

const AdminDash = () => {
  const [totalNumber, settotalNumber] = useState(0);
  const [maleNumber, setmaleNumber] = useState(0);
  const [femaleNumber, setfemaleNumber] = useState(0);

  useEffect(() => {
    getGenderKPI().then((res) => {
      settotalNumber(res.totalNumber);
      setmaleNumber(res.maleNumber);
      setfemaleNumber(res.femaleNumber);
    });
  }, []);

  return (
    <>
      {/* <div className={dash.heading1}>
        <h2>Total Number of Students : </h2>
      </div> */}

      <div className="myform">
        <div>
          <h2>1. Gender distribution of students</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            width: "100%",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div>Total Students : {totalNumber}</div>
          <div>Male : {maleNumber}</div>
          <div>Female : {femaleNumber}</div>
        </div>
        <div className={dash.content1}>
          <div className={dash.piechart}>
            <PieChart />
          </div>
        </div>
      </div>

      <div className="myform">
        <div>
          <h2>2. Grade distribution of students</h2>
        </div>
        <div className={dash.bar}>
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default AdminDash;
