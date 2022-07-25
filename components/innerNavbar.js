import React from "react";
import { useContext, useState , useMemo } from "react";
import userContext from "../context/userContext";

const InnerNavbar = () => {
  const user = useContext(userContext);

  const toggleSidebar = () => {
    user.updateState(
      user.userState.type,
      user.userState.userId,
      user.userState.view,
      !user.userState.sidebar
    );
  };

  const dashboardName = {
    Admin: "School Dashboard",
    SuperAdmin: "School Dashboard",
    Student: "Student Profile",
  };

  const navContent = {
    1: dashboardName[user.userState.type],
    2: "Add Student",
    2.1: "Student Profile",
    3: "View Records",
    4: "Mark Attendence",
    4.1: "View Attendence",
    5: "Upload Assignment",
    5.1: "Submitted Assignments",
    6: "Grade Card",
    7: "Time Table",
    7.1: "Add Academeic Performance Indicators",
    8:
      user.userState === "Student"
        ? "Modification requests"
        : "Request Modification",
    9: "History",
  };
  // console.log(user.userState);

  // const [click , setClick ] = useState(false)
 
  
  return (
    <>
      <div className="innerNavbar">
        <div className="iconHolder">
          <img
            src="./menu.svg"
            alt=""
            onClick={() => {
              toggleSidebar();
            }}
            style={{cursor:"pointer"}}
          />
        </div>
        <div className="main_inner_nav_heading">
          {navContent[user.userState.view]}
        </div>
      </div>
    </>
  );
};

export default InnerNavbar;
