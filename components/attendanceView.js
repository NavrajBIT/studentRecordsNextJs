import React from "react";
import { useState } from "react";
import {
  getStudentAttendence,
  getStudentsFromGrade,
} from "../api/contractCall";

const AttendanceView = () => {
  const [status, setStatus] = useState("");
  const [noOfDays, setNoOfDays] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [students, setStudents] = useState([]);

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  const poppulateAttendanceData = () => {
    let fromDateinDateFormat = new Date(selectedYear, selectedMonth - 1, 1);
    let fromDate = parseInt(fromDateinDateFormat.getTime() / 1000);
    let toDateinDateFormat = new Date(selectedYear, selectedMonth, 0);
    let toDate = parseInt(toDateinDateFormat.getTime() / 1000);

    if (selectedGrade > 0) {
      setStatus("Loading students...");
      getStudentsFromGrade(parseInt(selectedGrade))
        .then((res) => {
          setTimeout(() => {
            console.log(res.data);
            setStatus("Loading attendance...");
            setStudents(res.data);
            res.data.forEach((student) => {
              getStudentAttendence(student.studentId, fromDate, toDate).then(
                (res) => {
                  console.log(res);
                }
              );
            });
          }, 10000);
        })
        .catch((err) => {
          setStatus("Something went wrong. Please refresh.");
        });
    }
  };
  return (
    <div className="myform">
      <div className="formelement">
        <label htmlFor="gradeSelector">Select Grade</label>
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
      <div className="formelement">
        <label htmlFor="yearSelector">Year: </label>
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
      <div className="formelement">
        <label htmlFor="monthSelector">Year: </label>
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
      <button
        onClick={() => {
          poppulateAttendanceData();
        }}
      >
        View Attendance
      </button>
      <div className="status">{status}</div>
    </div>
  );
};

export default AttendanceView;
