import React from "react";
import { useEffect, useState } from "react";
import { getStudentRollNumber } from "../../api/contractCall";

const StudentRollNumber = (props) => {
  const [rollNumber, setRollNumber] = useState("loading...");
  useEffect(() => {
    getStudentRollNumber(props.studentId).then((res) => {
      setRollNumber(res);
    });
  }, [props]);
  return <>{rollNumber}</>;
};

export default StudentRollNumber;
