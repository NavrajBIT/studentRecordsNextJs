import React from "react";
import { useState, useEffect } from "react";
import { getStudentsFromGrade, markAttendance } from "../api/contractCall";
import box from "./box.module.css";
const Attendance = () => {
  let reader = new FileReader();
  


  const [status, setStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    if (selectedGrade > 0) {
      setStatus("Loading students...");
      getStudentsFromGrade(parseInt(selectedGrade))
        .then((res) => {
          setTimeout(() => {
            setStudents(res.data);
            setStatus("");
          }, 10000);
        })
        .catch((err) => {
          setStatus("Something went wrong. Please refresh.");
        });
    }
  }, [selectedGrade]);
  let sNo = 0;
  return (
    <>
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
          <label htmlFor="dateselector">Select Date</label>
          <input
            type="date"
            id="dateselector"
            onChange={(e) => {
              let d = new Date(e.target.value);
              console.log(e.target.value);
              let epochTime = parseInt(d.getTime() / 1000);
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
                  <div>{student.studentName}</div>
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
                              student.studentName +
                                "'s attendance not recorded."
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
      <div className={box.uploadAttendence}>
        <h4>Click Here To Upload Attendence Of Whole Month</h4>
        <div className="inputFile">
            <input type="file" aria-label="File browser example" onChange={(e) =>{
              console.log(e.target.files)
              reader.readAsDataURL(files[0])
              reader.onload = (e2)=>{
                console.log(e2.target.result)
              }
            }} />
          </div>
        {/* <label class="file">
          <input type="file" id="file" aria-label="File browser example" />
          <span class="file-custom"></span>
        </label> */}
      </div>
    </>
  );
};

export default Attendance;
