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

const Assignment = () => {
  const [status, setStatus] = useState("");
  const user = useContext(userContext);

  const [myAssignments, setMyAssignments] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(0);
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
                />
              );
            })}
          </div>
        </>
      );
    }
  };

  if (user.userState.type === "Admin") {
    const [fileData, setFileData] = useState("");
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
          setStatus("Could not upload assignment. Check data and try again.");
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
                let domItem = document.getElementById("fileField" + "label");
                domItem.innerHTML = "Uploading...";
                await fileHash(e.target.files[0])
                  .then((res) => {
                    setFileData(res);
                    domItem.innerHTML = e.target.files[0].name;
                  })
                  .catch((err) => {
                    domItem.innerHTML = "Error. Choose file again.";
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
        <div className="formelement">
          <h2>Submitted Assignments:</h2>
        </div>
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
                    let url = "http://ipfs.io/ipfs/" + assignment.file;
                    window.open(url);
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
