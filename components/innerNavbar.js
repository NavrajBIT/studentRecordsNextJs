import React from "react";
import { useContext, useState } from "react";
import userContext from "../context/userContext";

const InnerNavbar = () => {
  const user = useContext(userContext);

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

  return (
    <>
      <div className="innerNavbar">
        <div className="iconHolder">
          <img src="./menu.svg" alt="" />
        </div>
        {navContent[user.userState.view]}
      </div>
    </>
  );
};

export default InnerNavbar;
