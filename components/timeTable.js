import React from "react";
import { fileHash } from "../api/contractCall";
import { useState, useContext, useEffect } from "react";
import {
  addTimeTable,
  getStudentData,
  viewExamTimeTable,
  viewClassTimeTable,
  fileDownload,
} from "../api/contractCall";
import userContext from "../context/userContext";

const TimeTable = () => {
  const [status, setStatus] = useState("");
  const user = useContext(userContext);

  const [fileData, setFileData] = useState("");

  /// student hooks

  const [myClassTable, setMyClassTable] = useState("");
  const [myClassTableTime, setMyClassTableTime] = useState(0);
  const [myExamTable, setMyExamTable] = useState("");
  const [myExamTableTime, setMyExamTableTime] = useState(0);

  useEffect(() => {
    setStatus("loading time tables...");
    getStudentData(user.userState.id)
      .then((res) => {
        let grade = res.grade;
        viewClassTimeTable(grade)
          .then((res) => {
            setMyClassTable(res.file);
            setMyClassTableTime(res.time);
            setStatus("");
          })
          .catch((err) => {
            setStatus("Could not find class time table.");
          });
        viewExamTimeTable(grade)
          .then((res) => {
            setMyExamTable(res.file);
            setMyExamTableTime(res.time);
            setStatus("");
          })
          .catch((err) => {
            setStatus("Could not find exam time table.");
          });
      })
      .catch((err) => {
        setStatus("Something went wrong. Please refresh the page.");
      });
  }, []);

  if (user.userState.type === "Admin" || user.userState.type === "SuperAdmin") {
    const uploadTimeTable = async () => {
      setStatus("Uploading time table...");
      let exam = document.getElementById("typeField").value;
      if (exam === "class") {
        exam = "";
      }

      let grade = document.getElementById("gradeField").value;
      let file = fileData;
      await addTimeTable(grade, exam, file)
        .then((res) => {
          if (res.status === "Success") {
            setStatus("Time table uploaded successfully.");
          } else {
            setStatus("Could not upload time table. Check data and try again.");
          }
        })
        .catch((err) => {
          setStatus("Could not upload time table. Check data and try again.");
        });
    };
    return (
      <div className="myform">
        <div>
          <div className="formelement">
            <label htmlFor="typeField">Class or exam :</label>
            <select name="typeField" id="typeField">
              <option value="class">Class Time Table</option>
              <option value="exam">Exam Time Table</option>
            </select>
          </div>

          <div className="formelement">
            <label htmlFor="gradeField">Grade :</label>
            <input type="number" placeholder="Enter grade" id="gradeField" />
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
            uploadTimeTable();
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

  return (
    <>
      <div className="myform">
        <div className="status">{status}</div>
        {myClassTable !== "" && myClassTable !== "Time table not found" && (
          <div>
            <h2>Download Class Time Table here: </h2>
            <p style={{ color: "white" }}>
              Class Time table added on {getDate(myClassTableTime)}
            </p>

            <button
              onClick={() => {
                fileDownload(myClassTable, "classtimetable.pdf");
              }}
            >
              Download
            </button>
          </div>
        )}
        {myExamTable !== "" && myExamTable !== "Time table not found" && (
          <div>
            <h2>Download Exam Time Table here: </h2>
            <p style={{ color: "white" }}>
              Exam Time table added on {getDate(myExamTableTime)}
            </p>
            <button
              onClick={() => {
                fileDownload(myExamTable, "examtimetable.pdf");
              }}
            >
              Download
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TimeTable;
