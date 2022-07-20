import React, { useEffect } from "react";
import { useContext, useState } from "react";
import userContext from "../context/userContext";
import { raiseRequest } from "../api/contractCall";
import { getRequestCount, fileHash } from "../api/contractCall";
import ModificationRequest from "./SmallerComponents/modificationRequest";
import ModificationRequestStudent from "./SmallerComponents/modificationRequestStudent";

const ModifyRequest = () => {
  const user = useContext(userContext);
  const [status, setStatus] = useState("");
  const [file, setFile] = useState("");

  const StudentVersionOfRequestsPage = () => {
    const submitRequest = () => {
      setStatus("Submitting request...");
      let title = document.getElementById("titleField").value;
      let description = document.getElementById("descriptionField").value;
      raiseRequest(user.userState.id, title, file, description)
        .then((res) => {
          if (res.status === "Success") {
            setStatus("Request submitted successfully.");
          } else {
            setStatus("Something went wrong. Check data and try again.");
          }
        })
        .catch((err) => {
          setStatus("Something went wrong. Check data and try again.");
        });
    };

    return (
      <>
        <div className="myform">
          <div className="formelement">
            <label htmlFor="titleField">Title: </label>
            <input
              type="text"
              id="titleField"
              placeholder="Title of your request"
            />
          </div>
          <div className="formelement">
            <label htmlFor="fileFiled">Supporting document</label>
            <label
              htmlFor="fileField"
              id="fileFieldLabel"
              className="fileselector"
            >
              Upload
            </label>
            <input
              type="file"
              style={{ display: "none" }}
              id="fileField"
              onChange={(e) => {
                let myLabel = document.getElementById("fileFieldLabel");
                myLabel.innerHTML = "Uploading...";
                fileHash(e.target.files[0])
                  .then((res) => {
                    setFile(res);
                    myLabel.innerHTML = e.target.files[0].name;
                  })
                  .catch((err) => {
                    myLabel.innerHTML = "Error. Please upload again.";
                  });
              }}
            />
          </div>
          <div className="formelement">
            <label htmlFor="descriptionField">Description: </label>
            <input
              type="text"
              id="descriptionField"
              placeholder="Detailed explaination of your request."
              rows="50000"
              height="500px"
              style={{ height: "300px" }}
            />
          </div>
          <button
            onClick={() => {
              submitRequest();
            }}
          >
            Submit
          </button>
          <div className="status">{status}</div>
        </div>
      </>
    );
  };

  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getRequestCount().then((res) => {
      let totalRequests = res.totalRequests;
      requests = [];
      for (let i = totalRequests; i > 0; i--) {
        requests.push(i);
      }
      setRequests(requests);
    });
  }, []);
  let sNo = 0;

  return (
    <>
      {user.userState.type === "Student" && <StudentVersionOfRequestsPage />}

      <div className="myform">
        {requests.length > 0 && (
          <div>
            {requests.map((request) => {
              sNo++;
              if (user.userState.type === "Student") {
                return (
                  <ModificationRequestStudent
                    key={request}
                    requestId={request}
                    sNo={sNo}
                  />
                );
              }
              return (
                <ModificationRequest
                  key={request}
                  requestId={request}
                  sNo={sNo}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ModifyRequest;
