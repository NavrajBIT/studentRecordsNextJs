import React from "react";
import { useState, useEffect, useContext } from "react";

import userContext from "../context/userContext";

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
      poppulateAttendanceData();
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
    let dateString = year + "-" + myMonth + "-" + date;
    let mydate = new Date(dateString);
    return parseInt(mydate.getTime() / 1000);
  }

  const poppulateAttendanceData = async () => {
    setStatus("Loading student data...");
    let studentName = "";
    let rollNumber = 0;
    let grade = 0;
    await getStudentData(user.userState.id).then((res) => {
      studentName = res.studentName;
      rollNumber = res.rollNumber;
      grade = res.grade;
    });
    console.log(studentName, rollNumber, grade);
    let noOfDays = getDaysInMonth(selectedYear, selectedMonth);

    let studentAttendenceData = [];
    setTimeout(async () => {
      setStatus("Loading attendance...");
      let thisStudent = {
        studentName: studentName,
        rollNumber: rollNumber,
        attendenceArray: [],
      };
      let thisDay = 0;
      while (thisDay < noOfDays) {
        let mydate = getEpochTime(selectedYear, selectedMonth, thisDay + 1);
        await getStudentAttendence(user.userState.id, mydate).then((res) => {
          let attendance = {
            date: thisDay + 1,
            value: res.attendanceMark,
          };
          thisStudent.attendenceArray.push(attendance);
        });
        thisDay++;
      }
      studentAttendenceData.push(thisStudent);

      console.log(studentAttendenceData);
      setTimeout(() => {
        console.log(studentAttendenceData);
        setStudents(studentAttendenceData);
        setStatus("");
      }, 15000);
    }, 10000);
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
            Your attendence for {selectedMonth}/{selectedYear}
          </h2>
        </div>
        <div className="attendanceChart">
          <div>S.No.</div>
          <div>Name</div>
          <div>Roll.N.</div>
          {dates.length > 0 && (
            <>
              {dates.map((date) => {
                return <div className="attendanceValue">{date}</div>;
              })}
            </>
          )}
        </div>
        {students.map((student) => {
          sNo++;
          return (
            <div key={student.studentId} className="attendanceChart">
              <div>{sNo}</div>
              <div>{student.studentName}</div>
              <div>{student.rollNumber}</div>
              {student.attendenceArray.map((date) => {
                let back = "white";
                if (date.value == 1) {
                  back = "green";
                }
                if (date.value == 2) {
                  back = "red";
                }
                if (date.value == 3) {
                  back = "yellow";
                }
                return (
                  <div
                    className="attendanceValue"
                    key={student.studentId + "with" + date.date}
                    style={{ backgroundColor: back }}
                  >
                    {attendanceValue[date.value]}
                  </div>
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
