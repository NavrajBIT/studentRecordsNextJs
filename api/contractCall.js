import { ethers } from "ethers";
import contractData from "./contractData.json";
import compiledContract from "./compiledContract.json";
import { create } from "ipfs-http-client";
import { Web3Storage } from "web3.storage";

export const mainAdmins = {
  1: "0bdcbd60a73c33b212cabfaa64826ab5697b0c8678cccdc1ad1c6d7238f91245",
  2: "22bccf7763541eb0ef72887064314978f4f0451eadca1a473bd7fdcb22ae96ca",
  3: "459be641c65d575692a3108826a1df456dca1391849941d92b9062ca0bd53306",
};

// const client = create("http://localhost:5001");

//Provider
const provider = new ethers.providers.JsonRpcProvider("");
const iface = new ethers.utils.Interface(compiledContract["abi"]);
//Signer
const wallet = new ethers.Wallet(
  "0bdcbd60a73c33b212cabfaa64826ab5697b0c8678cccdc1ad1c6d7238f91245",
  provider
);
//Conrtact
const myContract = new ethers.Contract(
  contractData["mainContract"],
  compiledContract["abi"],
  provider
);

const mySignerContract = myContract.connect(wallet);

const makeStorageClient = () => {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQyRjVFZkI5QmZFOThhOGQ4YkQ0NzVmMTg4OTU5N2YxQ2M2QzBiMkIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTgzMzQ0NDY4NDMsIm5hbWUiOiJzdHVkZW50cmVjb3JkcyJ9.y6rtpa_8sY6j4dMO8LteeqLdS4JmsBub29sN7Olz9MY",
  });
};

export const fileHash = async (file) => {
  // let response = await client.add(file);
  // return response["path"];
  let files = [file];
  const client = makeStorageClient();
  const cid = await client.put(files);
  return cid;
};

export const fileDownload = async (hash, fileName) => {
  let url = "https://ipfs.io/ipfs/" + hash;
  // window.open(url);
  let req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "blob";
  req.onload = function () {
    //Convert the Byte Data to BLOB object.
    var blob = new Blob([req.response], {
      type: "application/octetstream",
    });

    //Check the Browser type and download the File.
    var isIE = false || !!document.documentMode;
    if (isIE) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      var url = window.URL || window.webkitURL;
      let link = url.createObjectURL(blob);
      var a = document.createElement("a");
      a.setAttribute("download", fileName);
      a.setAttribute("href", link);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  req.send();
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
export const getAdminData = async (address) => {
  return await mySignerContract
    .getAdminData(address)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const addStudent = async (studentParams, modifierId) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
  let response = { studentId: 0, status: "Failed" };
  let tx = await mySignerContract
    .addStudent(
      studentParams.studentName,
      studentParams.dob,
      studentParams.rollNumber,
      studentParams.grade,
      studentParams.section,
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

export const modifyPrimaryDetails = async (
  studentParams,
  studentId,
  modifierId
) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
  let response = await mySignerContract
    .modifyPrimaryDetails(
      studentParams.studentId,
      studentParams.studentName,
      studentParams.dob,
      studentParams.grade,
      studentParams.section,
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

export const addPersonalDetails = async (
  studentParams,
  studentId,
  modifierId
) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const addPaternalDetails = async (
  studentParams,
  studentId,
  modifierId
) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const addMaternalDetails = async (
  studentParams,
  studentId,
  modifierId
) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const addGuardianDetails = async (
  studentParams,
  studentId,
  modifierId
) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const addFamilyDetails = async (
  studentParams,
  studentId,
  modifierId
) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const addFiles = async (studentParams, studentId, modifierId) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const addNonAcademic = async (studentParams, studentId, modifierId) => {
  const myWallet = new ethers.Wallet(mainAdmins[modifierId], provider);
  mySignerContract = myContract.connect(myWallet);
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

export const modifyStudentData = async (studentParams, modifierId) => {
  let response = { status: "Success", studentId: 0 };
  await modifyPrimaryDetails(studentParams, 0, modifierId);
  let studentId = studentParams.studentId;
  response.studentId = studentId;
  await addPersonalDetails(studentParams, studentId, modifierId);
  await addPaternalDetails(studentParams, studentId, modifierId);
  await addMaternalDetails(studentParams, studentId, modifierId);
  await addGuardianDetails(studentParams, studentId, modifierId);
  await addFamilyDetails(studentParams, studentId, modifierId);
  await addFiles(studentParams, studentId, modifierId);
  await addNonAcademic(studentParams, studentId, modifierId);
  return response;
};
export const addStudentData = async (studentParams, modifierId) => {
  let response = { status: "Success", studentId: 0 };

  let addStudentResponse = await addStudent(studentParams, modifierId);
  if (addStudentResponse.status === "Failed") {
    response.status = "Failed";
    return response;
  }
  let studentId = addStudentResponse.studentId;
  response.studentId = studentId;
  await addPersonalDetails(studentParams, studentId, modifierId);
  await addPaternalDetails(studentParams, studentId, modifierId);
  await addMaternalDetails(studentParams, studentId, modifierId);
  await addGuardianDetails(studentParams, studentId, modifierId);
  await addFamilyDetails(studentParams, studentId, modifierId);
  await addFiles(studentParams, studentId, modifierId);
  await addNonAcademic(studentParams, studentId, modifierId);
  return response;
};

export const getStudentData = async (studentId) => {
  let response = {
    status: "Failed",
    studentName: "",
    dob: "",
    rollNumber: "",
    grade: "",
    section: "",
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
    response.section = res["_section"];
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
export const getStudentName = async (studentId) => {
  return await mySignerContract.getPrimaryDetails(studentId).then((res) => {
    return res["_studentName"];
  });
};
export const getStudentRollNumber = async (studentId) => {
  return await mySignerContract.getPrimaryDetails(studentId).then((res) => {
    return ethers.utils.formatUnits(res["_rollNumber"], 0);
  });
};

export const getStudentIdFromRollNumber = async (rollNummber) => {
  return await mySignerContract
    .rollNumberToStudentId(rollNummber)
    .then((res) => {
      return ethers.utils.formatUnits(res, 0);
    })
    .catch((err) => {
      return 0;
    });
};

export const searchStudent = async (name, grade, rollNumber) => {
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

  if (parseInt(rollNumber) > 0) {
    await mySignerContract
      .rollNumberToStudentId(rollNumber)
      .then(async (res) => {
        let studentId = ethers.utils.formatUnits(res, 0);
        let thisStudentData = {
          studentId: studentId,
          studentName: "",
          dob: "",
          rollNumber: rollNumber,
          grade: "",
          email: "",
        };
        await mySignerContract.getPrimaryDetails(studentId).then((res) => {
          thisStudentData.studentName = res["_studentName"];
          thisStudentData.dob = ethers.utils.formatUnits(res["_dob"], 0);
          thisStudentData.grade = ethers.utils.formatUnits(res["_grade"], 0);
        });
        studentData.data.push(thisStudentData);
      });
  }

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
  return await mySignerContract
    .queryFilter(myFilter)
    .then((res) => {
      res.map((event) => {
        let studentId = parseInt(ethers.utils.formatUnits(event.topics[1], 0));
        let rollNumber = parseInt(ethers.utils.formatUnits(event.topics[2], 0));
        let thisgrade = parseInt(ethers.utils.formatUnits(event.topics[3], 0));
        if (thisgrade == grade) {
          let student = {
            studentId: studentId,
            rollNumber: rollNumber,
            grade: thisgrade,
            studentName: "student name",
          };
          response.data.push(student);
        }
      });
      return response;
    })
    .catch((err) => {
      response.status = "Failed";
      return response;
    });
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
  return await mySignerContract
    .getAttendance(studentId, date)
    .then((res) => {
      response.attendanceMark = ethers.utils.formatUnits(res, 0);
      return response;
    })
    .catch((err) => {
      response.status = "Failed";
      return response;
    });
};

export const getGenderKPI = async () => {
  let response = {
    totalNumber: 0,
    maleNumber: 0,
    femaleNumber: 0,
  };
  await mySignerContract.getGenderKPI().then((res) => {
    response.totalNumber = ethers.utils.formatUnits(res.totalNumber, 0);
    response.maleNumber = ethers.utils.formatUnits(res.maleNumber, 0);
    response.femaleNumber = ethers.utils.formatUnits(res.femaleNumber, 0);
  });
  return response;
};

export const raiseRequest = async (studentId, title, file, description) => {
  return await mySignerContract
    .raiseRequest(studentId, title, file, description)
    .then((res) => {
      return { status: "Success", res: res };
    })
    .catch((err) => {
      return { status: "Failed", res: err };
    });
};
export const closeRequest = async (requestId) => {
  return await mySignerContract
    .closeRequest(requestId)
    .then((res) => {
      return { status: "Success", res: res };
    })
    .catch((err) => {
      return { status: "Failed", res: err };
    });
};
export const rejectRequest = async (requestId) => {
  return await mySignerContract
    .rejectRequest(requestId)
    .then((res) => {
      return { status: "Success", res: res };
    })
    .catch((err) => {
      return { status: "Failed", res: err };
    });
};
export const approveRequest = async (requestId) => {
  return await mySignerContract
    .approveRequest(requestId)
    .then((res) => {
      return { status: "Success", res: res };
    })
    .catch((err) => {
      return { status: "Failed", res: err };
    });
};

export const getRequestCount = async () => {
  return await mySignerContract
    .getRequestCount()
    .then((res) => {
      return {
        status: "Success",
        totalRequests: ethers.utils.formatUnits(res["requestCount"], 0),
        pendingRequestCount: ethers.utils.formatUnits(
          res["pendingRequestCount"],
          0
        ),
        rejectedRequestCount: ethers.utils.formatUnits(
          res["rejectedRequestCount"],
          0
        ),
        approvedRequestCount: ethers.utils.formatUnits(
          res["approvedRequestCount"],
          0
        ),
        closedRequestCount: ethers.utils.formatUnits(
          res["closedRequestCount"],
          0
        ),
      };
    })
    .catch((err) => {
      return { status: "Failed", totalRequests: 0, pendingRequests: 0 };
    });
};
export const getRequestData = async (requestId) => {
  return await mySignerContract
    .getRequestData(requestId)
    .then((res) => {
      return {
        status: "Success",
        studentId: ethers.utils.formatUnits(res["studentId"], 0),
        title: res["title"],
        description: res["description"],
        file: res["file"],
        status: res["status"],
      };
    })
    .catch((err) => {
      return {
        status: "Failed",
        studentId: 0,
        title: "",
        description: "",
        file: "",
        status: "",
      };
    });
};

export const getLatestBlock = async () => {
  return await provider
    .getBlockNumber()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
export const getTxFromBlock = async (blockNumber) => {
  return await provider
    .getBlock(blockNumber)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getModifier = async (blockNumber) => {
  return await provider.getBlock(blockNumber).then((res) => {
    let hash = res.transactions[0];
    return provider.getTransaction(hash).then((res) => {
      return mySignerContract.getAdminData(res.from).then((res) => {
        return res;
      });
    });
  });
};

export const getHistory = async (blockNumber) => {
  // let tx = await provider.getTransaction(hash);
  // return tx;

  // return iface.functions;

  return await provider.getBlock(blockNumber).then(async (res) => {
    let hash = res.transactions[0];
    return await provider
      .getTransaction(hash)
      .then((res) => {
        // return res;
        let decodeddata = iface.parseTransaction({
          data: res.data,
          value: res.value,
        });
        return decodeddata;
      })
      .catch((err) => {
        return err;
      });
  });

  // return await provider
  //   .getBlock(800)
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });

  // return await provider
  //   .getTransaction(
  //     "0x79071073e11922d50b2a827f95793c69352937b06a1154b584ee1e11e7418037"
  //   )
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });

  // let tx = await provider
  //   .getBlockWithTransactions(800)
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });

  // return await provider
  //   .getBlockNumber()
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
};

export const getBlockDetail = async (blockNumber) => {
  return await provider
    .getBlock(blockNumber)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getBatchCount = async (grade) => {
  return await mySignerContract
    .getBatchCount(grade)
    .then((res) => {
      return ethers.utils.formatUnits(res, 0);
    })
    .catch((err) => {
      return 0;
    });
};

export const getPerformanceIndicator = async (batchId, grade) => {
  return await mySignerContract
    .getPerformanceIndicator(batchId, grade)
    .then((res) => {
      return {
        batch: ethers.utils.formatUnits(res.batch, 0),
        totalStudents: ethers.utils.formatUnits(res.totalStudents, 0),
        passedStudents: ethers.utils.formatUnits(res.passedStudents, 0),
        failedStudents: ethers.utils.formatUnits(res.failedStudents, 0),
      };
    })
    .catch((err) => {
      return {
        batch: 0,
        totalStudents: 0,
        passedStudents: 0,
        failedStudents: 0,
      };
    });
};

export const addPerformanceIndicator = async (
  grade,
  batch,
  totalStudents,
  passedStudents,
  failedStudents
) => {
  return await mySignerContract
    .addPerformanceIndicator(
      grade,
      batch,
      totalStudents,
      passedStudents,
      failedStudents
    )
    .then((res) => {
      return { status: "Success" };
    })
    .catch((err) => {
      return { status: "Failed" };
    });
};

export const getStudentsInGradeSection = async (grade, section) => {
  return await mySignerContract
    .getStudentsInGradeSection(grade, section)
    .then((res) => {
      return ethers.utils.formatUnits(res, 0);
    })
    .catch((err) => {
      return err;
    });
};
