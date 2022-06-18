import React from "react";
import { studentData } from "../formData/studentDataForm";
import { fileHash, addStudentData } from "../api/contractCall";
import { useState } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";

const AddStudent = () => {
  const user = useContext(userContext);
  const [status, setStatus] = useState("");
  const [fileData, setFileData] = useState({
    uploadAadharFront: "",
    uploadAadharBack: "",
    uploadIncomeCertificate: "",
    uploadBirthCertificate: "",
    uploadCasteCertificate: "",
  });

  const submitData = async () => {
    setStatus("Adding student...");
    let defaultDob = document.getElementById("dob").value;
    let DateDob = new Date(defaultDob);
    let dob = parseInt(DateDob.getTime() / 1000);
    let studentData = {
      studentName: document.getElementById("studentName").value,
      dob: dob,
      rollNumber: document.getElementById("rollNumber").value,
      grade: document.getElementById("grade").value,
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

    await addStudentData(studentData)
      .then((res) => {
        if (res.status === "Success") {
          setStatus("Student data added successfully.");
          user.updateState(user.userState.type, res.studentId, 2.1);
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
                        <span>{label.required === "y" && "*"}</span>
                      </label>
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
                          });
                        }}
                      />
                    </div>
                  );
                }
                if (label.type === "dropdown") {
                  return (
                    <div className="formelement" key={label.id}>
                      <label htmlFor={label.id}>
                        {label.label} :
                        <span>{label.required === "y" && "*"}</span>
                      </label>
                      <select name={label.id} id={label.id}>
                        {label.placeholder.map((option) => {
                          return (
                            <option value={option} key={label.id + option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }
                return (
                  <div className="formelement" key={label.id}>
                    <label htmlFor={label.id}>
                      {label.label} :
                      <span>{label.required === "y" && "*"}</span>
                    </label>
                    <input
                      type={label.type}
                      id={label.id}
                      placeholder={label.placeholder}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        <div className="status">{status}</div>
        <button onClick={() => submitData()}>Submit</button>
      </div>
    </>
  );
};

export default AddStudent;
