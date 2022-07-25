import React from "react";
import { searchStudent } from "../api/contractCall";
import { useState } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";
// import {AiOutlineLoading3Quarters} from "react-icons/ai"
// import { Circles } from 'react-loading-icons'
import { SpinningCircles } from 'react-loading-icons'




const ViewRecords = () => {
  const user = useContext(userContext);
  const [searchData, setSearchData] = useState([]);
  const [status, setStatus] = useState()

  const getDate = (epochValue) => {
    epochValue = parseInt(epochValue) * 1000;
    let d = new Date(epochValue);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  const searchStudents = async () => {
    // setStatus(<Circles  height={50}/>);
    
    setStatus(<SpinningCircles  height={50} stroke="#98ff98" strokeOpacity={.125}/>);

    
    let studentName = document.getElementById("nameField").value;
    let studentGrade = document.getElementById("gradeField").value;
    let studentRollNumber = document.getElementById("idField").value;
    searchStudent(studentName, studentGrade, studentRollNumber).then((res) => {
      setTimeout(() => {
        setSearchData(res.data);
        if (res.data.length === 0) {
          setStatus("No result found.");
        } else {
          setStatus("");
        }
      }, 1000);
    });
  };

  const SearchResult = () => {
    if (searchData.length === 0) {
      return <></>;
    }

    let sNo = 0;
    return (
      <>
        <div className="searchResult">
          <div className="resultsinglerow">
            <div style={{ borderBottom: "1px solid white" }}>S.No.</div>
            <div style={{ borderBottom: "1px solid white" }}>Name</div>
            <div style={{ borderBottom: "1px solid white" }}>D.O.B.</div>
            <div style={{ borderBottom: "1px solid white" }}>Roll Number</div>
            <div style={{ borderBottom: "1px solid white" }}>Grade</div>
          </div>
          {searchData.map((student) => {
            sNo++;
            return (
              <div
                className="resultsinglerow"
                onClick={() => {
                  user.updateState(user.userState.type, student.studentId, 2.1);
                }}
                key={student.rollNumber}
              >
                <div>{sNo}.</div>
                <div>{student.studentName}</div>
                <div>{getDate(student.dob)}</div>

                <div>{student.rollNumber}</div>
                <div>{student.grade}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="myform viewrecord">
      <div>
        <div className="formelement">
          <label htmlFor="nameField">Name :</label>
          <input type="text" placeholder="Enter name" id="nameField" />
        </div>
        <div className="formelement">
          <label htmlFor="gradeField">Grade :</label>
          <input type="number" placeholder="Enter grade" id="gradeField" />
        </div>
        <div className="formelement">
          <label htmlFor="idField">Roll Number :</label>
          <input type="number" placeholder="Enter roll number" id="idField" />
        </div>
      </div>
      <button
        onClick={() => {
          searchStudents();
        }}
      >
        Search
      </button>
      <div className="status">{status}</div>
      <SearchResult />
    </div>
  );
};

export default ViewRecords;
