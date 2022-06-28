import React from "react";
import BarChart from "./BarChart";
import dash from "./dash.module.css";
import PieChart from "./PieChart";
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

  const [performanceIndicators, setPerformanceIndicators] = useState([]);

  useEffect(() => {
    getGenderKPI().then((res) => {
      settotalNumber(res.totalNumber);
      setmaleNumber(res.maleNumber);
      setfemaleNumber(res.femaleNumber);
    });
    poppulateKPI();
  }, []);

  const poppulateKPI = async () => {
    getStudentsInGradeSection(7, "a").then((res) => {
      console.log(res);
    });

    gradeSectionData = [];

    for (let grade = 1; grade <= 10; grade++) {
      let gradeData = { a: 0, b: 0, c: 0, d: 0 };
      await getStudentsInGradeSection(grade, "a").then((res) => {
        gradeData.a = res;
      });
      await getStudentsInGradeSection(grade, "b").then((res) => {
        gradeData.b = res;
      });
      await getStudentsInGradeSection(grade, "c").then((res) => {
        gradeData.c = res;
      });
      await getStudentsInGradeSection(grade, "d").then((res) => {
        gradeData.d = res;
      });
      gradeSectionData.push(gradeData);
    }
    setGradeSectionData(gradeSectionData);
  };

  return (
    <>
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

        {gradeSectionData.length > 0 && (
          <BarChart studentData={gradeSectionData} />
        )}
      </div>
      <div className="myform">
        <div>
          <h2>3. Academic Performance Indicators</h2>
        </div>
        <div className="formelement">
          <label htmlFor="gradeField">Grade: </label>
          <select
            name="gradeField"
            id="gradeField"
            onChange={() => {
              let grade = parseInt(document.getElementById("gradeField").value);
              if (grade > 0) {
                getBatchCount(grade)
                  .then(async (res) => {
                    if (res > 0) {
                      let performanceIndicators = [];
                      for (let i = 1; i <= 10; i++) {
                        await getPerformanceIndicator(i, grade)
                          .then((indicator) => {
                            performanceIndicators.push(indicator);
                            if (i == 10) {
                              setPerformanceIndicators(performanceIndicators);
                            }
                          })
                          .then((err) => {
                            console.log(err);
                          });
                      }
                    } else {
                      setPerformanceIndicators([]);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
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
