import React from "react";
import { useEffect, useState } from "react";
import { getStudentAttendence } from "../../api/contractCall";

const IndividualAttendence = (props) => {
  const [attendance, setAttendence] = useState(0);
  const attendanceValue = {
    0: "",
    1: "P",
    2: "A",
    3: "H",
  };
  const backgroundColor = {
    0: "white",
    1: "green",
    2: "red",
    3: "yellow",
  };
  useEffect(() => {
    console.log("Individual date");
    getStudentAttendence(props.studentId, props.date).then((res) => {
      setAttendence(res.attendanceMark);
    });
  }, [props]);
  return (
    <div
      className="attendanceValue"
      style={{ backgroundColor: backgroundColor[attendance] }}
    >
      {attendanceValue[attendance]}
    </div>
  );
};

export default IndividualAttendence;
