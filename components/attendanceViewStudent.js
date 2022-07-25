import React from "react";
import { useState, useEffect, useContext } from "react";

import userContext from "../context/userContext";
import IndividualAttendence from "./Attendence/individualAttendence";
import StudentName from "./Attendence/studentName";
import { Bars } from 'react-loading-icons'

import {
  getStudentAttendence,
  getStudentsFromGrade,
  getStudentData,
} from "../api/contractCall";

const AttendanceViewStudent = () => {
  const user = useContext(userContext);
  const [status, setStatus] = useState("");

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);

  const attendanceValue = {
    1: "P",
    2: "A",
    3: "H",
  };

  useEffect(() => {
    if (selectedMonth > 0 && selectedYear > 0) {
      poppulateDates();
    }
  }, [selectedMonth, selectedYear]);

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

  const AttendanceDisplay = () => {
    if (dates.length === 0) {
      return <></>;
    }
    return (
      <>
        <div>
          <h2>
            Your attendence for {selectedMonth}/{selectedYear}
          </h2>
        </div>
        <div className="attendanceChart">
          <div></div>
          <div>Name</div>
          <div></div>

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

        <div className="attendanceChart">
          <div></div>
          <div>
            <StudentName studentId={user.userState.id} />
          </div>
          <div></div>

          {dates.map((date) => {
            let thisDate = getEpochTime(selectedYear, selectedMonth, date);
            return (
              <div key={date}>
                <IndividualAttendence
                  studentId={user.userState.id}
                  date={thisDate}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="myform">
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

export default AttendanceViewStudent;
