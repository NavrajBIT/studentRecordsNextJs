import React from "react";
import { fileHash } from "../api/contractCall";
import { useState, useContext, useEffect } from "react";
import { addMarksCard, getMarksCard } from "../api/contractCall";
import userContext from "../context/userContext";

const MarksCard = () => {
  const [status, setStatus] = useState("");
  const user = useContext(userContext);

  if (user.userState.type === "Admin" || user.userState.type === "SuperAdmin") {
    const [fileData, setFileData] = useState("");
    const uploadMarks = async () => {
      setStatus("Uploading marks card...");
      let rollNumber = document.getElementById("rollNumberField").value;
      let grade = document.getElementById("gradeField").value;
      let expiryInput = document.getElementById("expiryField").value;
      let expiryDate = new Date(expiryInput);
      let expiry = parseInt(expiryDate.getTime() / 1000);
      let file = fileData;
      await addMarksCard(rollNumber, grade, file, expiry)
        .then((res) => {
          if (res.status === "Success") {
            setStatus("Grade card uploaded successfully.");
          } else {
            setStatus("Could not upload grade card. Check data and try again.");
          }
        })
        .catch((err) => {
          setStatus("Could not upload grade card. Check data and try again.");
        });
    };
    return (
      <div className="myform">
        <div>
          <div className="formelement">
            <label htmlFor="nameField">Student Name :</label>
            <input type="text" placeholder="Enter name" id="nameField" />
          </div>
          <div className="formelement">
            <label htmlFor="rollNumberField">Roll number :</label>
            <input
              type="number"
              placeholder="Enter roll number"
              id="rollNumberField"
            />
          </div>
          <div className="formelement">
            <label htmlFor="gradeField">Grade :</label>
            <input type="number" placeholder="Enter grade" id="gradeField" />
          </div>
          <div className="formelement">
            <label htmlFor="expiryField">Last date of availability :</label>
            <input type="date" placeholder="Enter grade" id="expiryField" />
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
                    console.log(err);
                    domItem.innerHTML = "Error. Choose file again.";
                  });
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            uploadMarks();
          }}
        >
          Upload
        </button>
        <div className="status">{status}</div>
      </div>
    );
  }

  const [myMarks, setMyMarks] = useState([]);
  useEffect(() => {
    setStatus("loading grade card...");
    getMarksCard(user.userState.id)
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setMyMarks(res.data);
          setStatus("");
        }, 1000);
      })
      .catch((err) => {
        setStatus("");
      });
  }, []);

  const MarksCardData = () => {
    if (myMarks.length === 0) {
      return (
        <>
          <div className="noAss">No grade card available.</div>
        </>
      );
    }
    return (
      <>
        {myMarks.map((marks) => {
          return (
            <div className="searchResult" key={marks.file + marks.id}>
              Grade card for grade: {marks.grade}
              <button
                onClick={() => {
                  let url = "http://ipfs.io/ipfs/" + marks.file;
                  window.open(url);
                }}
              >
                Download Grade Card
              </button>
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
        <MarksCardData />
      </div>
    </>
  );
};

export default MarksCard;
