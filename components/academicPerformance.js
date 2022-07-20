import React from "react";
import { useState } from "react";
import { addPerformanceIndicator } from "../api/contractCall";

const AcademicPerformance = () => {
  const [status, setStatus] = useState("");
  return (
    <div className="myform">
      <div className="formelement">
        <label htmlFor="gradeField">Grade: </label>
        <input type="number" id="gradeField" placeholder="Enter grade" />
      </div>
      <div className="formelement">
        <label htmlFor="batchField">Batch: </label>
        <input type="number" id="batchField" placeholder="Enter batch" />
      </div>
      <div className="formelement">
        <label htmlFor="totalNumberField">Total number of students: </label>
        <input
          type="number"
          id="totalNumberField"
          placeholder="Total students in the grade of this batch"
        />
      </div>
      <div className="formelement">
        <label htmlFor="passField">Total Pass: </label>
        <input
          type="number"
          id="passField"
          placeholder="Total students passed"
        />
      </div>
      <div className="formelement">
        <label htmlFor="failedField">Total Failed: </label>
        <input
          type="number"
          id="failedField"
          placeholder="Total students failed"
        />
      </div>
      <button
        onClick={() => {
          setStatus("Submitting data...");
          let grade = document.getElementById("gradeField").value;
          let batch = document.getElementById("batchField").value;
          let totalStudents = document.getElementById("totalNumberField").value;
          let passedStudents = document.getElementById("passField").value;
          let failedStudents = document.getElementById("failedField").value;
          addPerformanceIndicator(
            grade,
            batch,
            totalStudents,
            passedStudents,
            failedStudents
          )
            .then((res) => {
              console.log(res);
              if (res.status === "Success") {
                setStatus("Uploaded successfully.");
              } else {
                setStatus("Something went wrong. Check data and try again.");
              }
            })
            .catch((err) => {
              console.log(err);
              setStatus("Something went wrong. Check data and try again.");
            });
        }}
      >
        Submit
      </button>
      <div className="status">{status}</div>
    </div>
  );
};

export default AcademicPerformance;
