import React, { useEffect } from "react";
import { studentData } from "../formData/studentDataForm";
import {
  fileDownload,
  fileHash,
  getStudentData,
  modifyStudentData,
} from "../api/contractCall";
import { useState, useContext } from "react";
import userContext from "../context/userContext";

const Profile = () => {
  const user = useContext(userContext);
  const [status, setStatus] = useState("");
  const [fileData, setFileData] = useState({
    uploadAadharFront: "",
    uploadAadharBack: "",
    uploadIncomeCertificate: "",
    uploadBirthCertificate: "",
    uploadCasteCertificate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [mystudentData, setMyStudentData] = useState({
    studentName: "loading...",
    dob: "loading...",
    rollNumber: "loading...",
    grade: "loading...",
    section: "loading...",
    email: "loading...",
    religion: "loading...",
    caste: "loading...",
    nationality: "loading...",
    aadharNumber: "loading...",
    gender: "loading...",
    fatherName: "loading...",
    currentAddress: "loading...",
    officeAddress: "loading...",
    fatherOccupation: "loading...",
    fatherEducation: "loading...",
    motherName: "loading...",
    motherOccupation: "loading...",
    motherEducation: "loading...",
    guardianName: "loading...",
    guardianAddress: "loading...",
    familyIncome: "loading...",
    primaryContact: "loading...",
    secondaryContact: "loading...",
    uploadAadharFront: "loading...",
    uploadAadharBack: "loading...",
    uploadIncomeCertificate: "loading...",
    uploadBirthCertificate: "loading...",
    uploadCasteCertificate: "loading...",
    sportsInvolved: "loading...",
    sportsAchievements: "loading...",
    extraCurricullum: "loading...",
    extraCurricullumAchievements: "loading...",
    personalityDevelopment: "loading...",
    personalityDevelopmentAchievements: "loading...",
  });

  const getDate = (epochValue) => {
    epochValue = parseInt(epochValue) * 1000;
    let d = new Date(epochValue);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  const getHtmlDate = (epochValue) => {
    epochValue = parseInt(epochValue) * 1000;
    let d = new Date(epochValue);
    let myYear = d.getFullYear();
    let myMonth =
      parseInt(d.getMonth()) + 1 < 9
        ? "0" + (d.getMonth() + 1)
        : d.getMonth() + 1;
    let myDay = parseInt(d.getDate()) < 9 ? "0" + d.getDate() : d.getDate();

    console.log(myYear + "-" + myMonth + "-" + myDay);
    return myYear + "-" + myMonth + "-" + myDay;
  };

  useEffect(() => {
    if (user.userState.id > 0) {
      getStudentData(user.userState.id).then((res) => {
        setMyStudentData(res);
        fileData = {
          uploadAadharFront: res.uploadAadharFront,
          uploadAadharBack: res.uploadAadharBack,
          uploadIncomeCertificate: res.uploadIncomeCertificate,
          uploadBirthCertificate: res.uploadBirthCertificate,
          uploadCasteCertificate: res.uploadCasteCertificate,
        };
        setFileData(fileData);
      });
    } else {
      user.updateState(user.userState.type, user.userState.type, 2);
    }
  }, [isEditing]);

  const submitData = async () => {
    setStatus("Updating student data...");
    let defaultDob = document.getElementById("dob").value;
    let DateDob = new Date(defaultDob);
    let dob = parseInt(DateDob.getTime() / 1000);
    let enteredData = {
      studentName: document.getElementById("studentName").value,
      dob: dob,
      studentId: user.userState.id,
      grade: document.getElementById("grade").value,
      section: document.getElementById("section").value,
      email: document.getElementById("email").value,
      religion: document.getElementById("religion").value,
      caste: document.getElementById("caste").value,
      nationality: document.getElementById("nationality").value,
      aadharNumber: document.getElementById("aadharNumber").value,
      gender: document.getElementById("gender").value,
      fatherName: document.getElementById("fatherName").value,
      currentAddress: document.getElementById("currentAddress").value,
      officeAddress: document.getElementById("officeAddress").value,
      fatherOccupation: document.getElementById("fatherOccupation").value,
      fatherEducation: document.getElementById("fatherEducation").value,
      motherName: document.getElementById("motherName").value,
      motherOccupation: document.getElementById("motherOccupation").value,
      motherEducation: document.getElementById("motherEducation").value,
      guardianName: document.getElementById("guardianName").value,
      guardianAddress: document.getElementById("guardianAddress").value,
      familyIncome: document.getElementById("familyIncome").value,
      primaryContact: document.getElementById("primaryContact").value,
      secondaryContact: document.getElementById("secondaryContact").value,
      uploadAadharFront: fileData["uploadAadharFront"],
      uploadAadharBack: fileData["uploadAadharBack"],
      uploadIncomeCertificate: fileData["uploadIncomeCertificate"],
      uploadBirthCertificate: fileData["uploadBirthCertificate"],
      uploadCasteCertificate: fileData["uploadCasteCertificate"],
      sportsInvolved: document.getElementById("sportsInvolved").value,
      sportsAchievements: document.getElementById("sportsAchievements").value,
      extraCurricullum: document.getElementById("extraCurricullum").value,
      extraCurricullumAchievements: document.getElementById(
        "extraCurricullumAchievements"
      ).value,
      personalityDevelopment: document.getElementById("personalityDevelopment")
        .value,
      personalityDevelopmentAchievements: document.getElementById(
        "personalityDevelopmentAchievements"
      ).value,
    };

    await modifyStudentData(enteredData, user.userState.id)
      .then((res) => {
        console.log(res);
        if (res.status === "Success") {
          setStatus("Student data saved successfully.");
          setIsEditing(!isEditing);
        } else {
          setStatus("This roll number already exists.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="myform">
        {(user.userState.type === "Admin" ||
          user.userState.type === "SuperAdmin") && (
          <div className="editButton">
            <button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        )}
        {studentData.map((field) => {
          return (
            <React.Fragment key={field.field}>
              <div className="formheading">
                <h2>{field.field}:</h2>
              </div>
              {field.data.map((label) => {
                if (label.type === "file") {
                  return (
                    <div className="formelement" key={label.id}>
                      <label htmlFor={label.id}>
                        {label.label} :
                        {isEditing && (
                          <span>{label.required === "y" && "*"}</span>
                        )}
                      </label>
                      {isEditing ? (
                        <>
                          <label
                            htmlFor={label.id}
                            className="fileselector"
                            id={label.id + "label"}
                          >
                            Choose file
                          </label>
                          <input
                            type={label.type}
                            id={label.id}
                            style={{ display: "none" }}
                            onChange={async (e) => {
                              let domItem = document.getElementById(
                                label.id + "label"
                              );
                              domItem.innerHTML = "Uploading...";
                              await fileHash(e.target.files[0]).then((res) => {
                                fileData[label.id] = res;
                                setFileData(fileData);
                                domItem.innerHTML = e.target.files[0].name;
                                console.log(fileData);
                              });
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <button
                            className="downloadButton"
                            onClick={() => {
                              let filename = label.id + ".pdf";
                              fileDownload(mystudentData[label.id], filename);
                            }}
                          >
                            Download
                          </button>
                        </>
                      )}
                    </div>
                  );
                }

                if (label.type === "dropdown") {
                  return (
                    <div className="formelement" key={label.id}>
                      <label htmlFor={label.id}>
                        {label.label} :
                        {isEditing && (
                          <span>{label.required === "y" && "*"}</span>
                        )}
                      </label>
                      {isEditing ? (
                        <>
                          <select
                            name={label.id}
                            id={label.id}
                            default="female"
                          >
                            <option value={mystudentData[label.id]}>
                              {mystudentData[label.id]}
                            </option>
                            {label.placeholder.map((option) => {
                              return (
                                <option value={option} key={label.id + option}>
                                  {option}
                                </option>
                              );
                            })}
                          </select>
                        </>
                      ) : (
                        <>
                          <label htmlFor="">{mystudentData[label.id]}</label>
                        </>
                      )}
                    </div>
                  );
                }
                return (
                  <div className="formelement" key={label.id}>
                    <label htmlFor={label.id}>
                      {label.label} :
                      {isEditing && (
                        <span>{label.required === "y" && "*"}</span>
                      )}
                    </label>
                    {!isEditing ? (
                      <>
                        {label.id === "dob" ? (
                          <>
                            <label>{getDate(mystudentData[label.id])}</label>
                          </>
                        ) : (
                          <label>{mystudentData[label.id]}</label>
                        )}
                      </>
                    ) : (
                      <>
                        {label.id === "rollNumber" ? (
                          <input
                            type={label.type}
                            id={label.id}
                            placeholder={label.placeholder}
                            value={mystudentData["rollNumber"]}
                            style={{ background: "rgba(255,255,255,0.5)" }}
                          />
                        ) : (
                          <input
                            type={label.type}
                            id={label.id}
                            placeholder={label.placeholder}
                            defaultValue={
                              label.type === "date"
                                ? getHtmlDate(mystudentData[label.id])
                                : mystudentData[label.id]
                            }
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        <div className="status">{status}</div>
        {isEditing && <button onClick={() => submitData()}>Save</button>}
      </div>
    </>
  );
};

export default Profile;
