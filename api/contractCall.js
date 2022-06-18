import { ethers } from "ethers";
import contractData from "./contractData.json";
import compiledContract from "./compiledContract.json";

import { create } from "ipfs-http-client";

const client = create("http://localhost:5001");

//Provider
const provider = new ethers.providers.JsonRpcProvider("");
//Signer
const wallet = new ethers.Wallet(
  "a8f961ca4bf8a121691c4486d69ef3f88ea1853af3cbdb14aa6495da3c9b1662",
  provider
);
//Conrtact
const myContract = new ethers.Contract(
  contractData["mainContract"],
  compiledContract["abi"],
  provider
);

const mySignerContract = myContract.connect(wallet);

export const fileHash = async (file) => {
  let response = await client.add(file);
  return response["path"];
};

export const checkLogin = async (name, password) => {
  let response = {
    status: "Success",
    loginType: null,
    userId: null,
  };
  await mySignerContract
    .loginCheck(name, password)
    .then((res) => {
      response.loginType = res[0];
      response.userId = ethers.utils.formatUnits(res[1], 0);
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};

export const addStudent = async (studentParams) => {
  let response = { studentId: 0, status: "Failed" };
  let tx = await mySignerContract
    .addStudent(
      studentParams.studentName,
      studentParams.dob,
      studentParams.rollNumber,
      studentParams.grade,
      studentParams.email
    )
    .catch((err) => {});
  try {
    await tx
      .wait()
      .then((res) => {
        response.status = "Success";
        response.studentId = ethers.utils.formatUnits(
          res.events[0].topics[1],
          0
        );
      })
      .catch((err) => {});
  } catch (err) {}
  return response;
};

export const modifyPrimaryDetails = async (studentParams, studentId) => {
  let response = await mySignerContract
    .modifyPrimaryDetails(
      studentParams.studentId,
      studentParams.studentName,
      studentParams.dob,
      studentParams.grade,
      studentParams.email
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addPersonalDetails = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addPersonalDetails(
      studentId,
      studentParams.religion,
      studentParams.caste,
      studentParams.nationality,
      studentParams.aadharNumber,
      studentParams.gender
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addPaternalDetails = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addPaternalDetails(
      studentId,
      studentParams.fatherName,
      studentParams.currentAddress,
      studentParams.officeAddress,
      studentParams.fatherOccupation,
      studentParams.fatherEducation
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addMaternalDetails = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addMaternalDetails(
      studentId,
      studentParams.motherName,
      studentParams.motherOccupation,
      studentParams.motherEducation
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addGuardianDetails = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addGuardianDetails(
      studentId,
      studentParams.guardianName,
      studentParams.guardianAddress
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addFamilyDetails = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addFamilyDetails(
      studentId,
      studentParams.familyIncome,
      studentParams.primaryContact,
      studentParams.secondaryContact
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addFiles = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addFiles(
      studentId,
      studentParams.uploadAadharFront,
      studentParams.uploadAadharBack,
      studentParams.uploadIncomeCertificate,
      studentParams.uploadBirthCertificate,
      studentParams.uploadCasteCertificate
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
  return response;
};

export const addNonAcademic = async (studentParams, studentId) => {
  let response = await mySignerContract
    .addNonAcademic(
      studentId,
      studentParams.sportsInvolved,
      studentParams.sportsAchievements,
      studentParams.extraCurricullum,
      studentParams.extraCurricullumAchievements,
      studentParams.personalityDevelopment,
      studentParams.personalityDevelopmentAchievements
    )
    .then((res) => {
      return "Success";
    })
    .catch((err) => {
      return "Failed";
    });
};

export const modifyStudentData = async (studentParams) => {
  let response = { status: "Success", studentId: 0 };
  await modifyPrimaryDetails(studentParams);
  let studentId = studentParams.studentId;
  response.studentId = studentId;
  await addPersonalDetails(studentParams, studentId);
  await addPaternalDetails(studentParams, studentId);
  await addMaternalDetails(studentParams, studentId);
  await addGuardianDetails(studentParams, studentId);
  await addFamilyDetails(studentParams, studentId);
  await addFiles(studentParams, studentId);
  await addNonAcademic(studentParams, studentId);
  return response;
};
export const addStudentData = async (studentParams) => {
  let response = { status: "Success", studentId: 0 };
  let addStudentResponse = await addStudent(studentParams);
  if (addStudentResponse.status === "Failed") {
    response.status = "Failed";
    return response;
  }
  let studentId = addStudentResponse.studentId;
  response.studentId = studentId;
  await addPersonalDetails(studentParams, studentId);
  await addPaternalDetails(studentParams, studentId);
  await addMaternalDetails(studentParams, studentId);
  await addGuardianDetails(studentParams, studentId);
  await addFamilyDetails(studentParams, studentId);
  await addFiles(studentParams, studentId);
  await addNonAcademic(studentParams, studentId);
  return response;
};

export const getStudentData = async (studentId) => {
  let response = {
    status: "Failed",
    studentName: "",
    dob: "",
    rollNumber: "",
    grade: "",
    email: "",
    religion: "",
    caste: "",
    nationality: "",
    aadharNumber: "",
    gender: "",
    fatherName: "",
    currentAddress: "",
    officeAddress: "",
    fatherOccupation: "",
    fatherEducation: "",
    motherName: "",
    motherOccupation: "",
    motherEducation: "",
    guardianName: "",
    guardianAddress: "",
    familyIncome: "",
    primaryContact: "",
    secondaryContact: "",
    uploadAadharFront: "",
    uploadAadharBack: "",
    uploadIncomeCertificate: "",
    uploadBirthCertificate: "",
    uploadCasteCertificate: "",
    sportsInvolved: "",
    sportsAchievements: "",
    extraCurricullum: "",
    extraCurricullumAchievements: "",
    personalityDevelopment: "",
    personalityDevelopmentAchievements: "",
  };
  await mySignerContract.getPrimaryDetails(studentId).then((res) => {
    response.studentName = res["_studentName"];
    response.dob = ethers.utils.formatUnits(res["_dob"], 0);
    response.rollNumber = ethers.utils.formatUnits(res["_rollNumber"], 0);
    response.grade = ethers.utils.formatUnits(res["_grade"], 0);
    response.email = res["_email"];
  });
  await mySignerContract.getPersonalDetails(studentId).then((res) => {
    response.religion = res["_religion"];
    response.caste = res["_caste"];
    response.nationality = res["_nationality"];
    response.aadharNumber = ethers.utils.formatUnits(res["_aadharNumber"], 0);
    response.gender = res["_gender"];
  });
  await mySignerContract.getPaternalDetails(studentId).then((res) => {
    response.fatherName = res["_fatherName"];
    response.currentAddress = res["_currentAddress"];
    response.officeAddress = res["_officeAddress"];
    response.fatherOccupation = res["_fatherOccupation"];
    response.fatherEducation = res["_fatherEducation"];
  });
  await mySignerContract.getMaternalDetails(studentId).then((res) => {
    response.motherName = res["_motherName"];
    response.motherOccupation = res["_motherOccupation"];
    response.motherEducation = res["_motherEducation"];
  });
  await mySignerContract.getGuardianDetails(studentId).then((res) => {
    response.guardianName = res["_guardianName"];
    response.guardianAddress = res["_guardianAddress"];
  });
  await mySignerContract.getFamilyDetails(studentId).then((res) => {
    response.familyIncome = ethers.utils.formatUnits(res["_familyIncome"], 0);
    response.primaryContact = ethers.utils.formatUnits(
      res["_primaryContact"],
      0
    );
    response.secondaryContact = ethers.utils.formatUnits(
      res["_secondaryContact"],
      0
    );
  });
  await mySignerContract.getFiles(studentId).then((res) => {
    response.uploadAadharFront = res["_uploadAadharFront"];
    response.uploadAadharBack = res["_uploadAadharBack"];
    response.uploadIncomeCertificate = res["_uploadIncomeCertificate"];
    response.uploadBirthCertificate = res["_uploadBirthCertificate"];
    response.uploadCasteCertificate = res["_uploadCasteCertificate"];
  });
  await mySignerContract.getNonAcademic(studentId).then((res) => {
    response.sportsInvolved = res["_sportsInvolved"];
    response.sportsAchievements = res["_sportsAchievements"];
    response.extraCurricullum = res["_extraCurricullum"];
    response.extraCurricullumAchievements =
      res["_extraCurricullumAchievements"];
    response.personalityDevelopment = res["_personalityDevelopment"];
    response.personalityDevelopmentAchievements =
      res["_personalityDevelopmentAchievements"];
  });

  return response;
};

export const searchStudent = async (name, grade) => {
  let studentData = { status: "Success", data: [] };
  const tx = await mySignerContract.searchStudent(name, grade);
  const receipt = await tx.wait();
  const events = receipt?.events; // # => Event[] | undefined
  events.map(async (event) => {
    let studentId = parseInt(ethers.utils.formatUnits(event.topics[1], 0));
    let thisStudentData = {
      studentId: studentId,
      studentName: "",
      dob: "",
      rollNumber: "",
      grade: "",
      email: "",
    };
    await mySignerContract.getPrimaryDetails(studentId).then((res) => {
      thisStudentData.studentName = res["_studentName"];
      thisStudentData.dob = ethers.utils.formatUnits(res["_dob"], 0);
      thisStudentData.rollNumber = ethers.utils.formatUnits(
        res["_rollNumber"],
        0
      );
      thisStudentData.grade = ethers.utils.formatUnits(res["_grade"], 0);
      thisStudentData.email = res["_email"];
    });

    studentData.data.push(thisStudentData);
  });

  return studentData;
};
export const addAssignmentSolution = async (assignmentId, file, studentId) => {
  let response = { status: "Success" };
  await mySignerContract
    .addAssignmentSolution(assignmentId, file, studentId)
    .then((res) => {})
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};
export const addAssignment = async (grade, subject, file, topic, expiry) => {
  let response = { status: "Success" };
  await mySignerContract
    .addAssignment(grade, subject, file, topic, expiry)
    .then((res) => {})
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};

export const addMarksCard = async (rollNumber, grade, file, expiry) => {
  let studentId = await mySignerContract
    .rollNumberToStudentId(rollNumber)
    .then((res) => {
      return res;
    });
  let response = { status: "Success" };
  await mySignerContract
    .addMarksCard(studentId, grade, file, expiry)
    .then((res) => {})
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};

export const addTimeTable = async (grade, exam, file) => {
  let now = new Date();
  let epochTime = parseInt(now.getTime() / 1000);
  let response = { status: "Success" };
  await mySignerContract
    .addTimeTable(grade, exam, file, epochTime)
    .then((res) => {})
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};

export const viewClassTimeTable = async (grade) => {
  let response = { status: "Success", file: "", time: 0 };
  await mySignerContract
    .viewClassTimeTable(grade)
    .then((res) => {
      response.file = res.timeTableFile;
      response.time = res.uploadTime;
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};
export const viewExamTimeTable = async (grade) => {
  let response = { status: "Success", file: "", time: 0 };
  await mySignerContract
    .viewExamTimeTable(grade)
    .then((res) => {
      response.file = res.timeTableFile;
      response.time = res.uploadTime;
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};

export const getAssignments = async (grade, todayDate) => {
  let response = { status: "Success", data: [] };
  const myFilter = mySignerContract.filters.assignmentAdded(null, null, null);
  let pastEvents = await mySignerContract
    .queryFilter(myFilter)
    .then((res) => {
      res.map(async (event) => {
        let assignmentId = parseInt(
          ethers.utils.formatUnits(event.topics[1], 0)
        );
        let expiryDate = parseInt(ethers.utils.formatUnits(event.topics[3], 0));
        let thisgrade = parseInt(ethers.utils.formatUnits(event.topics[2], 0));
        if (thisgrade == grade && expiryDate > todayDate) {
          let assignment = {
            id: assignmentId,
            subject: "",
            topic: "",
            file: "",
            grade: thisgrade,
            expiry: expiryDate,
          };
          await mySignerContract.getAssignmentData(assignmentId).then((res) => {
            assignment.subject = res.subject;
            assignment.topic = res.topic;
            assignment.file = res.file;
          });
          response.data.push(assignment);
        }
      });
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};
export const getAssignmentSolutions = async (assignmentId) => {
  let response = { status: "Success", data: [] };
  const myFilter = mySignerContract.filters.assignmentSolutionAdded(
    null,
    null,
    null
  );
  let pastEvents = await mySignerContract
    .queryFilter(myFilter)
    .then((res) => {
      res.map(async (event) => {
        let thisassignmentId = parseInt(
          ethers.utils.formatUnits(event.topics[1], 0)
        );
        let solutionId = parseInt(ethers.utils.formatUnits(event.topics[2], 0));
        let studentId = parseInt(ethers.utils.formatUnits(event.topics[3], 0));
        if (thisassignmentId == assignmentId) {
          let solution = {
            id: solutionId,
            studentId: studentId,
            assignmentId: assignmentId,
            file: "",
            studentName: "",
            rollNumber: "",
          };
          await mySignerContract
            .getAssignmentSolutionData(solutionId)
            .then((res) => {
              solution.file = res.file;
            });
          await getStudentData(parseInt(studentId)).then((res) => {
            solution.studentName = res.studentName;
            solution.rollNumber = res.rollNumber;
          });
          response.data.push(solution);
        }
      });
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};
export const getMarksCard = async (studentId) => {
  let now = new Date();
  let epochTime = parseInt(now.getTime() / 1000);
  let response = { status: "Success", data: [], res: [] };
  const myFilter = mySignerContract.filters.marksCardAdded(null, null, null);
  let pastEvents = await mySignerContract
    .queryFilter(myFilter)
    .then((res) => {
      res.map(async (event) => {
        let marksCardId = parseInt(
          ethers.utils.formatUnits(event.topics[1], 0)
        );
        let thisstudentId = parseInt(
          ethers.utils.formatUnits(event.topics[2], 0)
        );
        let expiryDate = parseInt(ethers.utils.formatUnits(event.topics[3], 0));
        if (thisstudentId == studentId && expiryDate >= epochTime) {
          let marks = {
            id: marksCardId,
            file: "",
            grade: 0,
          };
          await mySignerContract.getMarksCardData(marksCardId).then((res) => {
            marks.file = res.file;
            marks.grade = parseInt(ethers.utils.formatUnits(res.class, 0));
          });
          response.data.push(marks);
        }
      });
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};
export const getStudentsFromGrade = async (grade) => {
  let response = { status: "Success", data: [] };
  const myFilter = mySignerContract.filters.studentAdded(null, null, null);
  let pastEvents = await mySignerContract
    .queryFilter(myFilter)
    .then((res) => {
      res.map(async (event) => {
        let studentId = parseInt(ethers.utils.formatUnits(event.topics[1], 0));
        let rollNumber = parseInt(ethers.utils.formatUnits(event.topics[2], 0));
        let thisgrade = parseInt(ethers.utils.formatUnits(event.topics[3], 0));
        if (thisgrade == grade) {
          let student = {
            studentId: studentId,
            rollNumber: rollNumber,
            grade: thisgrade,
            studentName: "",
          };
          await getStudentData(studentId).then((res) => {
            student.studentName = res.studentName;
          });
          response.data.push(student);
        }
      });
    })
    .catch((err) => {
      response.status = "Failed";
    });

  return response;
};
export const markAttendance = async (studentId, attendanceValue, date) => {
  let response = { status: "Success" };
  await mySignerContract
    .markAttendance(studentId, attendanceValue, date)
    .then((res) => {})
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};

export const getStudentAttendence = async (studentId, date) => {
  let response = { status: "Success", attendanceMark: 0 };
  await mySignerContract
    .getAttendance(studentId, date)
    .then((res) => {
      response.attendanceMark = ethers.utils.formatUnits(res, 0);
    })
    .catch((err) => {
      response.status = "Failed";
    });
  return response;
};
