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

const ModificationRequestStudent = (props) => {
  const user = useContext(userContext);
  const [studentId, setStudentId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    getRequestData(props.requestId).then((res) => {
      if (res.studentId === user.userState.id) {
        setStudentId(res.studentId);
        setTitle(res.title);
        setDescription(res.description);
        setFile(res.file);
        setStatus(res.status);
      }
    });
  }, []);

  if (title === "" && description === "") {
    return <></>;
  }
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
    </div>
  );
};

export default ModificationRequestStudent;
