import { BaseNextResponse } from "next/dist/server/base-http";
import React from "react";
import { useState, useEffect } from "react";
import {
  getStudentAttendence,
  getStudentsFromGrade,
  getStudentData,
} from "../api/contractCall";
import IndividualAttendence from "./Attendence/individualAttendence";
import StudentName from "./Attendence/studentName";

import { Bars } from 'react-loading-icons'


const AttendanceView = () => {
  const [status, setStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (selectedGrade > 0 && selectedMonth > 0 && selectedYear > 0) {
      poppulateDates();
      poppulateAttendanceData();
      // (async () => await poppulateAttendanceData())()
    }
  }, [selectedGrade, selectedMonth, selectedYear]);

  function poppulateDates() {
    let datesArray = [];
    let noOfDays = getDaysInMonth(selectedYear, selectedMonth);
    for (let i = 1; i <= noOfDays; i++) {
      datesArray.push(i);
    }
    setDates(datesArray);
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function getEpochTime(year, month, date) {
    let myMonth = month <= 9 ? "0" + month : month;
    date = date <= 9 ? "0" + date : date;
    let dateString = year + "-" + myMonth + "-" + date;
    let mydate = new Date(dateString);
    let utcYear =
      mydate.getUTCFullYear() <= 9
        ? "0" + mydate.getUTCFullYear()
        : mydate.getUTCFullYear();
    let utcMonth =
      mydate.getUTCMonth() + 1 <= 9
        ? "0" + (mydate.getUTCMonth() + 1)
        : mydate.getUTCMonth() + 1;
    let utcDate =
      mydate.getUTCDate() <= 9
        ? "0" + mydate.getUTCDate()
        : mydate.getUTCDate();
    let utcdateString = utcYear + "-" + utcMonth + "-" + utcDate;

    return parseInt(new Date(utcdateString).getTime() / 1000);
  }

  const poppulateAttendanceData = async () => {
    if (selectedGrade > 0) {
      setStatus(<Bars height={35}/>);
      await getStudentsFromGrade(parseInt(selectedGrade))
        .then((res) => {
          console.log(res);
          setStudents(res.data);
          setStatus("");
        })
        .catch((err) => {
          setStatus("Something went wrong. Please refresh.");
        });
    }
  };

  const attendanceValue = {
    1: "P",
    2: "A",
    3: "H",
  };

  const AttendanceDisplay = () => {
    if (students.length === 0) {
      return <></>;
    }

    let sNo = 0;
    return (
      <>
        <div>
          <h2>
            Attendence for grade {selectedGrade} for {selectedMonth}/
            {selectedYear}
          </h2>
        </div>
        <div className="attendanceChart">
          <div>S.No.</div>
          <div>Name</div>
          <div>Roll.N.</div>
          {dates.length > 0 && (
            <>
              {dates.map((date) => {
                return (
                  <div className="attendanceValue" key={date}>
                    {date}
                  </div>
                );
              })}
            </>
          )}
        </div>
        {students.map((student) => {
          sNo++;
          return (
            <div key={student.studentId} className="attendanceChart">
              <div>{sNo}</div>
              <div>
                <StudentName studentId={student.studentId} />
              </div>
              <div>{student.rollNumber}</div>
              {dates.map((date) => {
                let thisDate = getEpochTime(selectedYear, selectedMonth, date);
                return (
                  <IndividualAttendence
                    studentId={student.studentId}
                    date={thisDate}
                    key={student.studentId + thisDate}
                  />
                );
              })}
            </div>
          );
        })}
      </>
    );
  };
  return (
    <div className="myform">
      <div className="formelement" style={{ width: "320px" }}>
        <label htmlFor="gradeSelector">Grade :</label>
        <select
          name="gradeSelector"
          id="gradeSelector"
          onChange={(e) => {
            setSelectedGrade(e.target.value);
          }}
        >
          <option value="0">Select Grade</option>
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
      <div className="formelement" style={{ width: "320px" }}>
        <label htmlFor="yearSelector">Year : </label>
        <select
          name="yearSelector"
          id="yearSelector"
          onChange={(e) => {
            setSelectedYear(parseInt(e.target.value));
          }}
        >
          <option value="0">Select year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div className="formelement" style={{ width: "320px" }}>
        <label htmlFor="monthSelector">Month : </label>
        <select
          name="monthSelector"
          id="monthSelector"
          onChange={(e) => {
            setSelectedMonth(parseInt(e.target.value));
          }}
        >
          <option value="0">Select month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div className="status">{status}</div>
      <AttendanceDisplay />
    </div>
  );
};

export default AttendanceView;
