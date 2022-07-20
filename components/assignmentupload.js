import React from "react";
import { fileDownload, fileHash } from "../api/contractCall";
import { useState, useContext, useEffect } from "react";
import {
  addAssignment,
  getAssignments,
  getStudentData,
  addAssignmentSolution,
} from "../api/contractCall";
import userContext from "../context/userContext";
import AssignmentView from "./assignmentAnswers";

import Viewassignment from "./Viewassignment";
import { useNavigate } from "react-router-dom";
const Assignment = () => {
  // const navigate = useNavigaate
  // const navigate = useNavigate()
  const [status, setStatus] = useState("");
  const user = useContext(userContext);

  const [myAssignments, setMyAssignments] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(0);

  const [click , setClick] = useState('false')
  useEffect(() => {
    if (user.userState.type === "Student") {
      setStatus("loading assignments...");
      getStudentData(user.userState.id)
        .then((res) => {
          let grade = res.grade;
          let today = new Date();
          let todayDate = parseInt(today.getTime() / 1000);
          getAssignments(grade, todayDate).then((res) => {
            setTimeout(() => {
              setMyAssignments(res.data);
              setStatus("");
            }, 1000);
          });
        })
        .catch((err) => {
          setStatus("Something went wrong. Please refresh the page.");
        });
    } else {
    }
  }, [selectedGrade]);

  const [fileData, setFileData] = useState("");
  if (user.userState.type === "Admin" || user.userState.type === "SuperAdmin") {
    const uploadAssignment = async () => {
      setStatus("Uploading assignment...");
      let grade = document.getElementById("gradeField").value;
      let subject = document.getElementById("subjectField").value;
      let topic = document.getElementById("topicField").value;
      let expiryInput = document.getElementById("expiryField").value;
      let expiryDate = new Date(expiryInput);
      let expiry = parseInt(expiryDate.getTime() / 1000);
      let file = fileData;
      await addAssignment(grade, subject, file, topic, expiry)
        .then((res) => {
          if (res.status === "Success") {
            setStatus("Assignment uploaded successfully.");
          } else {
            setStatus("Could not upload assignment. Check data and try again.");
          }
        })  
        .catch((err) => {
          setStatus(`Could not upload assignment. Check data and try again. ${err} ` );
        });
    };
    return (
      <div className="myform">
        <div>
          <div className="formelement">
            <label htmlFor="gradeField">Grade :</label>
            <input type="number" placeholder="Enter grade" id="gradeField" />
          </div>
          <div className="formelement">
            <label htmlFor="subjectField">Subject :</label>
            <input type="text" placeholder="Enter subject" id="subjectField" />
          </div>
          <div className="formelement">
            <label htmlFor="topicField">Topic :</label>
            <input type="text" placeholder="Enter topic" id="topicField" />
          </div>
          <div className="formelement">
            <label htmlFor="expiryField">Last date of submission :</label>
            <input type="date" placeholder="Enter topic" id="expiryField" />
          </div>
          <div className="formelement">
            <label htmlFor="fileField">Upload file :</label>
            <label
              htmlFor="fileField"
              className="fileselector"
              id="fileFieldlabel"
            >
              Choose file
            </label>
            <input
              type="file"
              id="fileField"
              style={{ display: "none" }}
              onChange={async (e) => {
                alert(e)
                let domItem = document.getElementById("fileField" + "label");
                domItem.innerHTML = "Uploading...";
                await fileHash(e.target.files[0])
                  .then((res) => {
                    setFileData(res);
                    domItem.innerHTML = e.target.files[0].name;
                  })
                  .catch((err) => {
                    domItem.innerHTML = "Error. Choose file again.";
                    console.log(err)
                  });
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            uploadAssignment();
          }}
        >
          Upload
        </button>
        <div className="status">{status}</div>
      </div>
    );
  }

  const getDate = (epochValue) => {
    epochValue = parseInt(epochValue) * 1000;
    let d = new Date(epochValue);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  const AssignmentData = () => {
    if (myAssignments.length === 0) {
      return (
        <>
          <div className="noAss">No assignment due.</div>
        </>
      );
    }
    return (
      <>
        {myAssignments.map((assignment) => {
          return (
            <div
              className="searchResult"
              key={assignment.file + assignment.topic}
            >
              <div className="result">
                <div style={{ borderBottom: "1px solid white" }}>
                  Subject: {assignment.subject}
                </div>
                <div style={{ borderBottom: "1px solid white" }}>
                  Topic: {assignment.topic}
                </div>
                <div style={{ borderBottom: "1px solid white" }}>
                  Due date: {getDate(assignment.expiry)}
                </div>
                <div style={{ borderBottom: "1px solid white" }}>
                  Grade: {assignment.grade}
                </div>
              </div>
              <div className="updownbuttons">
                <button
                  onClick={() => {
                    let filename = assignment.subject + "assignment.pdf";
                    fileDownload(assignment.file, filename);
                  }}
                >
                  Download assignment
                </button>
                <input
                  type="file"
                  id={"fileField" + assignment.id}
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    setStatus("Uploading file...");
                    await fileHash(e.target.files[0])
                      .then(async (res) => {
                        await addAssignmentSolution(
                          assignment.id,
                          res,
                          user.userState.id
                        )
                          .then((res) => {
                            setStatus(
                              "Assignment on " +
                                assignment.topic +
                                " submitted successfully."
                            );
                          })
                          .catch((err) => {
                            setStatus("Error. Submit file again.");
                          });
                      })
                      .catch((err) => {
                        setStatus("Error. Submit file again.");
                      });
                  }}
                />
                <button
                  onClick={() => {
                    document
                      .getElementById("fileField" + assignment.id)
                      .click();
                  }}
                >
                  Submit assignment
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="myform">
        <div className="status">{status}</div>
        <AssignmentData />
      </div>
    </>
  );
};

export default Assignment;
