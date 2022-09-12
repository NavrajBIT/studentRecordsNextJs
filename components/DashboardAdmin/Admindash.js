import React from "react";
import dash from "./dash.module.css";

import dynamic from "next/dynamic";

// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// const BarChart = dynamic(() => import("./BarChart"), { ssr: false });
const PieChart = dynamic(() => import("./PieChart"), { ssr: false });
// const PerformanceChart = dynamic(() => import("./PerformanceChart"), {
//   ssr: false,
// });

import BarChart from "./BarChart";
// import PieChart from "./PieChart";
import PerformanceChart from "./PerformanceChart";

import { useState, useEffect } from "react";
import {
  getGenderKPI,
  getBatchCount,
  getPerformanceIndicator,
  getStudentsInGradeSection,
} from "../../api/contractCall";

const AdminDash = () => {
  const [totalNumber, settotalNumber] = useState(0);
  const [maleNumber, setmaleNumber] = useState(0);
  const [femaleNumber, setfemaleNumber] = useState(0);
  const [gradeSectionData, setGradeSectionData] = useState([]);

  const [performanceIndicators, setPerformanceIndicators] = useState([
    { passedStudents: 100, failedStudents: 30, batch: 2000 },
    { passedStudents: 120, failedStudents: 16, batch: 2001 },
    { passedStudents: 95, failedStudents: 18, batch: 2002 },
    { passedStudents: 65, failedStudents: 25, batch: 2003 },
    { passedStudents: 80, failedStudents: 11, batch: 2004 },
    { passedStudents: 125, failedStudents: 9, batch: 2005 },
    { passedStudents: 113, failedStudents: 5, batch: 2006 },
    { passedStudents: 125, failedStudents: 2, batch: 2007 },
    { passedStudents: 94, failedStudents: 2, batch: 2008 },
    { passedStudents: 100, failedStudents: 1, batch: 2009 },
  ]);

  // useEffect(() => {
  //   getGenderKPI().then((res) => {
  //     settotalNumber(res.totalNumber);
  //     setmaleNumber(res.maleNumber);
  //     setfemaleNumber(res.femaleNumber);
  //   });
  //   poppulateKPI();
  // }, []);

  // const poppulateKPI = async () => {
  //   gradeSectionData = [];
  //   setGradeSectionData(gradeSectionData);

  //   for (let grade = 1; grade <= 10; grade++) {
  //     let gradeData = { a: 0, b: 0, c: 0, d: 0 };

  //     await getStudentsInGradeSection(grade, "a").then((res) => {
  //       gradeData.a = res;
  //     });
  //     await getStudentsInGradeSection(grade, "b").then((res) => {
  //       gradeData.b = res;
  //     });
  //     await getStudentsInGradeSection(grade, "c").then((res) => {
  //       gradeData.c = res;
  //     });
  //     await getStudentsInGradeSection(grade, "d").then((res) => {
  //       gradeData.d = res;
  //     });
  //     gradeSectionData.push(gradeData);
  //   }

  //   setGradeSectionData(gradeSectionData);
  // };

  return (
    <>
      <div className="myform firstBox">
        <div>
          <h2>1. Gender distribution of students</h2>
        </div>

        <div className="box1">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "white",
              width: "100%",
              justifyContent: "left",
              alignItems: "left",
            }}
            className={dash.box1content}
          >
            <div>Total Students : 8000</div>
            <div>Male : 4505</div>
            <div>Female : 3495</div>
          </div>
          <div className={dash.content1}>
            <div className={dash.piechart}>
              {typeof window !== "undefined" && <PieChart />}
            </div>
          </div>
        </div>
      </div>

      <div className="myform secondBox">
        <div>
          <h2>2. Grade distribution of students</h2>
        </div>
        <BarChart />
      </div>
      <div className="myform thirdBox">
        <div>
          <h2>3. Academic Performance Indicators</h2>
        </div>

        <div className="formelement">
          <label htmlFor="gradeField">Grade: </label>
          <select
            name="gradeField"
            id="gradeField"
            // onChange={() => {
            //   let grade = parseInt(document.getElementById("gradeField").value);
            //   if (grade > 0) {
            //     getBatchCount(grade)
            //       .then(async (res) => {
            //         if (res > 0) {
            //           let performanceIndicators = [];
            //           for (let i = 1; i <= 10; i++) {
            //             await getPerformanceIndicator(i, grade)
            //               .then((indicator) => {
            //                 performanceIndicators.push(indicator);
            //                 if (i == 10) {
            //                   setPerformanceIndicators(performanceIndicators);
            //                 }
            //               })
            //               .then((err) => {
            //                 console.log(err);
            //               });
            //           }
            //         } else {
            //           setPerformanceIndicators([]);
            //         }
            //       })
            //       .catch((err) => {
            //         console.log(err);
            //       });
            //   }
            // }}
          >
            <option value="0">Choose Grade</option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
          </select>
        </div>

        {performanceIndicators.length > 0 && (
          <PerformanceChart performanceData={performanceIndicators} />
        )}
      </div>
    </>
  );
};

export default AdminDash;
