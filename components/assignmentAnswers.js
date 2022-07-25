import React from "react";
import { useState, useEffect } from "react";
import {
  fileDownload,
  getAssignmentSolutions,
  getStudentData,
} from "../api/contractCall";
import { Bars } from 'react-loading-icons'


const AssignmentView = (props) => {
  const [mySolutions, setMySolutions] = useState([]);
  const [mySubmissionStatus, setMySubmissionStatus] = useState(
    "No submissions found."
  );
  useEffect(() => {
    setMySubmissionStatus(<Bars height={35} />);
    getAssignmentSolutions(props.assignmentId)
      .then(async (res) => {
        setTimeout(() => {
          console.log(res);
          if (res.data.length === 0) {
            setMySubmissionStatus("No submissions yet.");
          }
          setMySolutions([...res.data]);
        }, 10000);
      })
      .catch((err) => {
        setMySubmissionStatus("Could not load submissions. Please refresh");
      });
  }, []);

  const Solutions = () => {
    if (mySolutions.length === 0) {
      return (
        <>
          <div style={{ color: "white" }}>
            {mySubmissionStatus}
            {mySubmissionStatus === "Loading submissions..." && (
              <div className="loadingIcon">
                <img src="./loading.svg" alt="" width="30" height="30" />
              </div>
            )}
          </div>
        </>
      );
    }

    let sNo = 0;

    return (
      <>
        <div className="submission">
          <div>S.No.</div>
          <div>Name</div>
          <div>Roll Number</div>
          <div>Submitted file</div>
        </div>
        {mySolutions.map((solution) => {
          sNo = sNo + 1;
          return (
            <div key={solution.file + solution.rollNumber}>
              <div className="submission">
                <div>{sNo}</div>
                <div>{solution.studentName}</div>
                <div>{solution.rollNumber}</div>
                <a
                  onClick={() => {
                    let filename = solution.studentName + "assignment.pdf";
                    fileDownload(solution.file, filename);
                  }}
                >
                  Download
                  <img src="./download.svg" alt="" width="25" height="25" />
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="assignmentHeading">
        <div>Subject: {props.assignmentSubject}</div>
        <div>Topic: {props.assignmentTopic}</div>
      </div>
      <div>
        <Solutions />
      </div>
    </>
  );
};

export default AssignmentView;
