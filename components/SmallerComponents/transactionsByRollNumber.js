import React from "react";
import { useEffect, useState } from "react";
import {
  getHistory,
  getBlockDetail,
  getStudentIdFromRollNumber,
  getModifier,
} from "../../api/contractCall";
import { ethers } from "ethers";
import StudentName from "../Attendence/studentName";

const TransactionsByRollNumber = (props) => {
  const [myFunction, setMyFunction] = useState("");
  const [studentId, setStudentId] = useState(0);
  const [params, setParams] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [modifier, setModifier] = useState("");
  const [blockTime, setBlockTime] = useState("");
  const [blockDate, setBlockDate] = useState("");
  const [detailerstyle, setDetailerStyle] = useState({
    display: "none",
    animation: "detailerup",
  });
  const [isFiltered, setIsFiltered] = useState(false);

  const functionNames = {
    addNonAcademic: "Modified non academic details",
    addFiles: "Modified student data files.",
    addGuardianDetails: "Modified guardian details",
    addMaternalDetails: "Modified maternal details",
    addPaternalDetails: "Modified paternal details",
    addStudent: "Added new student",
    addFamilyDetails: "Modified family details",
    modifyPrimaryDetails: "Modified Primary details",
  };

  const functionArgs = {
    addStudent: ["_studentName", "_dob", "_rollNumber", "_grade", "_email"],
    modifyPrimaryDetails: [
      "_studentName",
      "_dob",
      "_rollNumber",
      "_grade",
      "_email",
    ],
    addPersonalDetails: [
      "_religion",
      "_caste",
      "_nationality",
      "_aadharNumber",
      "_gender",
    ],
    addPaternalDetails: [
      "_fatherName",
      "_currentAddress",
      "_officeAddress",
      "_fatherOccupation",
      "_fatherEducation",
    ],
    addMaternalDetails: [
      "_motherName",
      "_motherOccupation",
      "_motherEducation",
    ],
    addGuardianDetails: ["_guardianName", "_guardianAddress"],
    addFamilyDetails: ["_familyIncome", "_primaryContact", "_secondaryContact"],
    addFiles: [
      "_uploadAadharFront",
      "_uploadAadharBack",
      "_uploadIncomeCertificate",
      "_uploadBirthCertificate",
      "_uploadCasteCertificate",
    ],
    addNonAcademic: [
      "_sportsInvolved",
      "_sportsAchievements",
      "_extraCurricullum",
      "_extraCurricullumAchievements",
      "_personalityDevelopment",
      "_personalityDevelopmentAchievements",
    ],
  };
  const functionArgLabels = {
    addStudent: [
      "Student Name",
      "Date of birth",
      "Roll number",
      "Grade",
      "email",
    ],
    modifyPrimaryDetails: [
      "Student Name",
      "Date of birth",
      "Roll Number",
      "Grade",
      "email",
    ],
    addPersonalDetails: [
      "Religion",
      "Caste",
      "Nationality",
      "AadharNumber",
      "Gender",
    ],
    addPaternalDetails: [
      "Father's Name",
      "Current Address",
      "Office Address",
      "Father's Occupation",
      "Father's Education",
    ],
    addMaternalDetails: [
      "Mother's Name",
      "Mother's Occupation",
      "Mother's Education",
    ],
    addGuardianDetails: ["Guardian Name", "GuardianAddress"],
    addFamilyDetails: ["Family Income", "Primary Contact", "Secondary Contact"],
    addFiles: [
      "Aadhar Card Front",
      "Aadhar Card Back",
      "Income Certificate",
      "Birth Certificate",
      "Caste Certificate",
    ],
    addNonAcademic: [
      "Sports Involved",
      "Sports Achievements",
      "Extra Curricullum",
      "Extra Curricullum Achievements",
      "Personality Development",
      "Personality Development Achievements",
    ],
  };

  useEffect(() => {
    setIsFiltered(false);
    getStudentIdFromRollNumber(props.rollNumber)
      .then((res1) => {
        let studentId = parseInt(res1);
        setStudentId(studentId);
        getBlockDetail(props.blockNumber).then((res) => {
          let mydate = new Date(parseInt(res.timestamp) * 1000);
          let myTimeString = mydate.getHours() + ":" + mydate.getMinutes();
          let mydateString =
            mydate.getDate() +
            "/" +
            (mydate.getMonth() + 1) +
            "/" +
            mydate.getFullYear();
          setBlockTime(myTimeString);
          setBlockDate(mydateString);
        });
        getModifier(props.blockNumber).then((res) => {
          setModifier(res.name);
        });
        getHistory(props.blockNumber)
          .then((res) => {
            if (functionNames[res.functionFragment.name] == undefined) {
              return null;
            }
            setMyFunction(res.functionFragment.name);
            if (
              parseInt(ethers.utils.formatUnits(res.args._studentId, 0)) ===
              studentId
            ) {
              console.log("here....");
              setIsFiltered(true);
            }
            let params = [];
            functionArgs[res.functionFragment.name].map((arg) => {
              let thisParam = res.args[arg];
              if (typeof res.args[arg] == "object") {
                thisParam = ethers.utils.formatUnits(res.args[arg], 0);
              }
              params.push(thisParam);
            });
            setParams(params);
          })
          .catch((err) => {
            // console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);

  const toggledetails = () => {
    if (detailerstyle.display === "none") {
      setDetailerStyle({
        display: "flex",
        flexDirection: "column",
      });
    } else {
      setDetailerStyle({
        display: "none",
      });
    }
  };

  if (myFunction === "" || !isFiltered) {
    return <></>;
  }
  return (
    <div
      className="transactions"
      onClick={() => {
        toggledetails();
      }}
    >
      <div className="header">
        <div>
          <div className="heading1">Modification:</div>
          <div>{functionNames[myFunction]}</div>
        </div>
        <div>
          <div className="heading1">Student Details:</div>
          <div>
            Name: <StudentName studentId={studentId} />
          </div>
          <div>Roll number: {props.rollNumber}</div>
        </div>
        <div>
          <div className="heading1">Time:</div>
          <div>Time: {blockTime} </div>
          <div>Date: {blockDate} </div>
        </div>
        <div>
          <div className="heading1">Modified by:</div>
          <div>{modifier} </div>
        </div>
      </div>
      <div className="detailer" id="detailer" style={detailerstyle}>
        {params.length > 0 && (
          <>
            <div className="heading1">Modified details:</div>
            {params.map((param) => {
              let index = params.indexOf(param);
              return (
                <div className="formelement" key={param + index}>
                  <div>{functionArgLabels[myFunction][index]} :</div>
                  <div>{param}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionsByRollNumber;
