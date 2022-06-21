import React from "react";
import { useEffect, useState } from "react";
import { getStudentName } from "../../api/contractCall";

const StudentName = (props) => {
  const [name, setName] = useState("loading...");
  useEffect(() => {
    console.log("Loading name");
    getStudentName(props.studentId).then((res) => {
      setName(res);
    });
  }, [props]);
  return <>{name}</>;
};

export default StudentName;
