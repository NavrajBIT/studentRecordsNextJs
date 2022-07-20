import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import React, { useEffect } from "react";
import { useContext, useState  ,useMemo  } from "react";
import userContext from "../context/userContext";

const Sidebar = () => {
  // const element =  document.getElementById("mySidenav")
  const user = useContext(userContext);
  const [attendanceToggle, setAttendanceToggle] = useState(false);
  const [assignmentToggle, setAssignmentToggle] = useState(false);

  const [click , setClick] = useState();

  // setClick(user.userState.sidebar)
  // window.addEventListener("load", function(){
    //everything is fully loaded, don't use me if you can use DOMContentLoaded
    // useEffect(() => {
      
      // function openNav() {
      //   document.getElementById("mySidenav").style.width = "250px";
      //   document.getElementById("main").style.marginLeft = "250px";
      // }
      
      function closeNav() {
        alert("click")
        document.getElementById("mySidenav").style.width = "20px";
        document.getElementById("main").style.marginLeft= "0px";
      }
    // }, [click])
    
  
  
 
  return (
    <>
      <div className="sidebar sidenav"   id="mySidenav"  >
     
        <h1
          className="dashhead"
          id="dash"
          onClick={() => {
            user.updateState(user.userState.type, user.userState.id, 1);  
            // setClick(user.userState.sidebar)
            // element.classList.add("dashclickAnimation")
            alert("eh")
            // closeNav()
          }}
        >
          Dashboard
        </h1>
        {/* <span style={{fontSize:"30px" , marginLeft:"100px", cursor:"pointer"}} onclick={openNav}>&#9776; open</span> */}
      
        {user.userState.type === "Admin" ||
        user.userState.type === "SuperAdmin" ? (
          <>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" }}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 2);
              }}
            >
              Add Student
            </div>

            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 3);
              }}
            >
              View Records
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                setAttendanceToggle(!attendanceToggle);
              }}
            >
              Attendence
            </div>
            {attendanceToggle ? (
              <>
                <div
                  className="sidebar-item-inner"
                  onClick={() => {
                    user.updateState(user.userState.type, user.userState.id, 4);
                  }}
                >
                  - Mark Attendence
                </div>
                <div
                  className="sidebar-item-inner"
                  onClick={() => {
                    user.updateState(
                      user.userState.type,
                      user.userState.id,
                      4.1
                    );
                  }}
                >
                  - View Attendence
                </div>
              </>
            ) : (
              <></>
            )}


            <div
              className="sidebar-item"
              onClick={() => {
                setAssignmentToggle(!assignmentToggle);
              }}
            >
              Assignment
            </div>
            {assignmentToggle && (
              <>
                <div
                  className="sidebar-item-inner"
                  onClick={() => {
                    user.updateState(user.userState.type, user.userState.id, 5);
                  }}
                >
                  - Upload Assignment
                </div>
                <div
                  className="sidebar-item-inner"
                  onClick={() => {
                    user.updateState(
                      user.userState.type,
                      user.userState.id,
                      5.1
                    );
                  }}
                >
                  - Submitted Assignment
                </div>
              </>
            )}
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 6);
              }}
            >
              Grade card
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7);
              }}
            >
              Time Table
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7.1);
              }}
            >
              Academic Performance
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 8);
              }}
            >
              Modification Requests
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 9);
              }}
            >
              History
            </div>
          </>
        ) : (
          <>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 4.2);
              }}
            >
              View Attendence
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 5);
              }}
            >
              Assignment
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 6);
              }}
            >
              Grade card
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7);
              }}
            >
              Time Table
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 8);
              }}
            >
              Request Modification
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
