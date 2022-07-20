import React from "react";
import { useState, useEffect } from "react";
import { getStudentsFromGrade, markAttendance } from "../api/contractCall";
import StudentName from "./Attendence/studentName";

const Attendance = () => {
  const [status, setStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    if (selectedGrade > 0) {
      setStatus("Loading students...");
      getStudentsFromGrade(parseInt(selectedGrade))
        .then((res) => {
          setStudents(res.data);
          setStatus("");
        })
        .catch((err) => {
          setStatus("Something went wrong. Please refresh.");
        });
    }
  }, [selectedGrade]);
  let sNo = 0;
  return (
    <div className="myform markattendence">
      <h2>Upload full month attendance</h2>
      <div className="formelement">
        <label htmlFor="fullattendanceupload">Select file</label>
        <label
          htmlFor="fullattendanceupload"
          id="fullattendanceuploadLabel"
          className="fileselector"
        >
          Choose File
        </label>
        <input
          type="file"
          id="fullattendanceupload"
          style={{ display: "none" }}
          onChange={(e) => {
            document.getElementById("fullattendanceuploadLabel").innerHTML =
              e.target.files[0].name;
          }}
        />
      </div>
      <button
        onClick={() => {
          setStatus("Uploading attendance...");
          setTimeout(() => {
            setStatus("Attendance uploaded.");
          }, 1000);
        }}
      >
        Upload
      </button>
      <h2>Mark today&apos;s attendance</h2>
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
        <label htmlFor="dateselector">Select Date</label>
        <input
          type="date"
          id="dateselector"
          onChange={(e) => {
            let d = new Date(e.target.value);
            let epochTime = parseInt(d.getTime() / 1000);
            console.log(epochTime);
            setSelectedDate(epochTime);
          }}
        />
      </div>
      <div className="status">{status}</div>
      {students.length > 0 && (
        <>
          <div
            className="classResultsforAttendance"
            style={{ borderBottom: "1px solid white" }}
          >
            <div>S.No.</div>
            <div>Name</div>
            <div>Roll Number</div>
            <div>Attendance</div>
          </div>
          {students.map((student) => {
            sNo++;
            return (
              <div
                className="classResultsforAttendance"
                key={student.rollNumber}
              >
                <div>{sNo}</div>
                <div>
                  <StudentName studentId={student.studentId} />
                </div>
                <div>{student.rollNumber}</div>
                <div>
                  <select
                    name="attendanceSelector"
                    id={"attendanceSelector" + student.rollNumber}
                    onChange={(e) => {
                      setStatus("Marking attendance...");
                      let attendanceValue = parseInt(e.target.value);
                      if (attendanceValue === 0) {
                        document.getElementById(
                          "attendanceSelector" + student.rollNumber
                        ).style.backgroundColor = "white";
                      }
                      if (attendanceValue === 1) {
                        document.getElementById(
                          "attendanceSelector" + student.rollNumber
                        ).style.backgroundColor = "green";
                      }
                      if (attendanceValue === 2) {
                        document.getElementById(
                          "attendanceSelector" + student.rollNumber
                        ).style.backgroundColor = "red";
                      }
                      if (attendanceValue === 3) {
                        document.getElementById(
                          "attendanceSelector" + student.rollNumber
                        ).style.backgroundColor = "yellow";
                      }
                      console.log(selectedDate);
                      markAttendance(
                        student.studentId,
                        attendanceValue,
                        selectedDate
                      )
                        .then((res) => {
                          setStatus("");
                        })
                        .catch((err) => {
                          setStatus(
                            student.studentName + "'s attendance not recorded."
                          );
                        });
                    }}
                  >
                    <option value="0">Select</option>
                    <option value="1">Present</option>
                    <option value="2">Absent</option>
                    <option value="3">Holiday</option>
                  </select>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Attendance;