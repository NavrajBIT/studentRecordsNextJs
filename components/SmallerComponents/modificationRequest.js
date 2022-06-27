import React from "react";
import { getRequestData } from "../../api/contractCall";
import { useState, useEffect } from "react";
import StudentName from "../Attendence/studentName";
import {
  closeRequest,
  rejectRequest,
  approveRequest,
} from "../../api/contractCall";
import { useContext } from "react";
import userContext from "../../context/userContext";

const ModificationRequest = (props) => {
  const user = useContext(userContext);
  const [studentId, setStudentId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    getRequestData(props.requestId).then((res) => {
      setStudentId(res.studentId);
      setTitle(res.title);
      setDescription(res.description);
      setFile(res.file);
      setStatus(res.status);
    });
  }, []);
  return (
    <div className="request" style={{ color: "white" }}>
      <div className="requestelement">
        <div className="heading1">Title</div>
        <div className="heading1">Submitted by</div>
        <div className="heading1">Status</div>
        <div className="heading1">Supporting Document</div>
      </div>
      <div className="requestelement">
        <div>
          {props.sNo}. {title}
        </div>
        <div>
          <StudentName studentId={studentId} />
        </div>
        <div>{status}</div>
        <div style={{ color: "rgba(255, 255, 255, 0.6)", fontStyle: "italic" }}>
          <button
            style={{ margin: "0px", width: "200px" }}
            onClick={() => {
              window.open("http://ipfs.io/ipfs/" + file);
            }}
          >
            download
          </button>
        </div>
      </div>
      <div className="heading1">Description: </div>

      <div>{description}</div>
      {status === "Pending" && user.userState.type === "SuperAdmin" && (
        <>
          <button
            onClick={() => {
              approveRequest(props.requestId)
                .then((res) => {
                  setStatus("Approved");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Approve
          </button>
          <button
            onClick={() => {
              rejectRequest(props.requestId)
                .then((res) => {
                  setStatus("Rejected");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Reject
          </button>
        </>
      )}
      {status === "Approved" && user.userState.type === "Admin" && (
        <>
          <button
            onClick={() => {
              closeRequest(props.requestId)
                .then((res) => {
                  setStatus("Closed");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Close Request
          </button>
        </>
      )}
    </div>
  );
};

export default ModificationRequest;
