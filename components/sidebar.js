import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import React, { useCallback, useEffect } from "react";
import { useContext, useState, useMemo } from "react";
import userContext from "../context/userContext";
import {MdOutlineDashboardCustomize} from 'react-icons/md'
const Sidebar = () => {
  const user = useContext(userContext);
  const [attendanceToggle, setAttendanceToggle] = useState(false);
  const [assignmentToggle, setAssignmentToggle] = useState(false);

  const [click, setClick] = useState();


  // const divs = document.querySelectorAll(".sidebar-item")
  useEffect(() => {
    const element = document.getElementById("sidbar");
    
    setClick(user.userState.sidebar);
    if (click) {
      element.style.display = "grid";
      element.style.width = "320px";
      // element2.style.width = "320px";

      // element2.style.border = "2px solid red";
      // divs.style.border = "2px solid green"

      element.style.transition = "width 2s";

      // console.log(click);
    } else {
      element.style.display = "none";
      element.style.width = "0px";
      // element2.style.width = "0px";


      // console.log(click);
    } 


    function myFunction(x) {
      if (x.matches) { // If media query matches
        if (click) {
          // element.style.height = "100%";
          element.style.display="grid";

            // element.classList.add("upToDownAnimation")
          // alert(click);

        } else if(!click) {
          element.style.display="none";
          // element.classList.add("downToUpAnimation")

          // alert(click);

        }
      } 
    }

    var x = window.matchMedia("(max-width: 500px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction) // Attach listener function on state changes
    }, [user.userState.sidebar]);

  return (
    <>
      <div
        className="sidebar"
        id="sidbar"
      >
        <h1
          className="dashhead"
        style={{fontSize:"25px"}}
          id="dash"
          onClick={() => {
            user.updateState(user.userState.type, user.userState.id, 1);
            // setClick(user.userState.sidebar)
            // element.classList.add("dashclickAnimation")
            // alert("eh")
            // closeNav()
          }}
        >
          Dashboard <MdOutlineDashboardCustomize height={10} />
        </h1>
        {/* <span style={{fontSize:"30px" , marginLeft:"100px", cursor:"pointer"}} onclick={openNav}>&#9776; open</span> */}

        {user.userState.type === "Admin" ||
        user.userState.type === "SuperAdmin" ? (
          <>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 2);
              }}
            >
              Add Student
            </div>

            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 3);
              }}
            >
              View Records
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
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
                  style={{ marginTop: "6px" , cursor:"pointer"}}
                  onClick={() => {
                    user.updateState(user.userState.type, user.userState.id, 4);
                  }}
                >
                  - Mark Attendence
                </div>
                <div
                  className="sidebar-item-inner"
                  style={{ marginTop: "6px" , cursor:"pointer"}}
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
              style={{ marginTop: "6px" , cursor:"pointer"}}
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
                  style={{ marginTop: "6px" , cursor:"pointer"}}
                  onClick={() => {
                    user.updateState(user.userState.type, user.userState.id, 5);
                  }}
                >
                  - Upload Assignment
                </div>
                <div
                  className="sidebar-item-inner"
                  style={{ marginTop: "6px" , cursor:"pointer"}}
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
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 6);
              }}
            >
              Grade card
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7);
              }}
            >
              Time Table
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7.1);
              }}
            >
              Academic Performance
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 8);
              }}
            >
              Modification Requests
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
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
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 4.2);
              }}
            >
              View Attendence
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 5);
              }}
            >
              Assignment
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}
              
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 6);
              }}
            >
              Grade card
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}

              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7);
              }}
            >
              Time Table
            </div>
            <div
              className="sidebar-item"
              style={{ marginTop: "6px" , cursor:"pointer"}}

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
