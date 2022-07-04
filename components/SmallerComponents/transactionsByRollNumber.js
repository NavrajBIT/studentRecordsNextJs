import React from "react";
import { useEffect, useState } from "react";
import {
  getLatestBlock,
  getHistory,
  getModifier,
  getBlockDetail,
  getStudentIdFromRollNumber,
} from "../../api/contractCall";
import { ethers } from "ethers";
import StudentName from "../Attendence/studentName";
import StudentRollNumber from "../Attendence/studentRollNumber";

const Transactions = (props) => {
  const [myFunction, setMyFunction] = useState("");
  const [params, setParams] = useState([]);
  const [detailerstyle, setDetailerStyle] = useState({
    display: "none",
    animation: "detailerup",
  });

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
      "Section",
      "email",
    ],
    modifyPrimaryDetails: [
      "Student Name",
      "Date of birth",
      "Roll Number",
      "Grade",
      "Section",
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

  const [block, setBlock] = useState(0);
  const [modification, setModification] = useState("");
  const [modifier, setModifier] = useState("");
  const [studentId, setStudentId] = useState(0);
  const [blockTime, setBlockTime] = useState("");
  const [blockDate, setBlockDate] = useState("");

  useEffect(() => {
    setModification("loading...");
    setStudentId(0);
    setParams([]);
    setMyFunction("");
    setModifier("");
    setBlockDate("");
    setBlockTime("");
    getLatestBlock()
      .then((res) => {
        let thisBlock = parseInt(res) - parseInt(props.resultNumber);
        setBlock(thisBlock);
        getHistory(thisBlock)
          .then((res) => {
            console.log(res);
            if (functionNames[res.functionFragment.name] != undefined) {
              setMyFunction(res.functionFragment.name);
              setModification(functionNames[res.functionFragment.name]);
              if (res.functionFragment.name == "addStudent") {
                let rollNumber = ethers.utils.formatUnits(
                  res.args._rollNumber,
                  0
                );

                getStudentIdFromRollNumber(rollNumber).then((res) => {
                  setStudentId(res);
                });
              } else {
                setStudentId(ethers.utils.formatUnits(res.args._studentId, 0));
              }
              poppulateSecondaryDetails(thisBlock);
              setParams(res.args);
            } else {
              setModification("Secondary Operation");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .then((err) => {
        console.log(err);
      });
  }, [props]);

  const poppulateSecondaryDetails = async (thisBlock) => {
    getModifier(thisBlock)
      .then((res) => {
        setModifier(res.name);
      })
      .catch((err) => {
        console.log(err);
      });

    getBlockDetail(thisBlock).then((res) => {
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
  };

  const toggledetails = () => {
    if (detailerstyle.display === "none") {
      setDetailerStyle({
        display: "flex",
        flexDirection: "column",
        padding: "0px 20px",
      });
    } else {
      setDetailerStyle({
        display: "none",
      });
    }
  };

  if (modification !== "" && modification !== "Secondary Operation") {
    return (
      <div
        className="transactions"
        onClick={() => {
          toggledetails();
        }}
      >
        <div className="header">
          <div>{block}</div>
          <div>{modification}</div>
          <div>{modifier}</div>
          <div>
            <StudentName studentId={studentId} />
          </div>
          <div>
            <StudentRollNumber studentId={studentId} />
          </div>
          <div>{blockDate}</div>
          <div>{blockTime}</div>
        </div>
        {params.length > 0 && (
          <div style={detailerstyle}>
            {functionArgLabels[myFunction].map((param) => {
              let index = parseInt(
                functionArgLabels[myFunction].indexOf(param) + 1
              );
              if (myFunction == "addStudent") {
                index--;
              }
              return (
                <div
                  className="formelement"
                  key={param + props.resultNumber + studentId}
                >
                  <div>{param} :</div>
                  <div>
                    {typeof params[index] == "object"
                      ? ethers.utils.formatUnits(params[index], 0)
                      : params[index]}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  return <div></div>;
};

export default Transactions;
