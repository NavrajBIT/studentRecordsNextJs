import React from "react";
import { fileHash } from "../api/contractCall";
import { useState, useContext, useEffect } from "react";
import {
  addAssignment,
  getAssignments,
  getStudentData,
  addAssignmentSolution,
} from "../api/contractCall";
import userContext from "../context/userContext";
import AssignmentView from "./assignmentAnswers";

const SubmittedAssignmentView = () => {
  const [status, setStatus] = useState("");
  const user = useContext(userContext);

  const [myAssignments, setMyAssignments] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(0);
  useEffect(() => {
    if (parseInt(document.getElementById("gradeSelector").value) > 0) {
      setStatus("loading assignments...");
      let grade = parseInt(document.getElementById("gradeSelector").value);
      let today = new Date();
      let todayDate = parseInt(today.getTime() / 1000);
      getAssignments(grade, todayDate).then((res) => {
        setTimeout(() => {
          setMyAssignments(res.data);
          setStatus("");
        }, 1000);
      });
    }
  }, [selectedGrade]);

  const AssignmentAnswers = () => {
    if (myAssignments.length === 0) {
      return (
        <>
          <div style={{ color: "white" }}>No assignments found.</div>
        </>
      );
    } else {
      return (
        <>
          <div>
            {myAssignments.map((assignment) => {
              return (
                <AssignmentView
                  assignmentId={assignment.id}
                  assignmentSubject={assignment.subject}
                  assignmentTopic={assignment.topic}
                  key={assignment.id}
                />
              );
            })}
          </div>
        </>
      );
    }
  };

  return (
    <div className="myform">
      <div className="status">{status}</div>

      <div className="formelement">
        <label htmlFor="gradeSelector">Select Grade</label>
        <select
          name="gradeSelector"
          id="gradeSelector"
          onChange={(e) => {
            setSelectedGrade(selectedGrade + 1);
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
      <AssignmentAnswers />
    </div>
  );
};

export default SubmittedAssignmentView;
