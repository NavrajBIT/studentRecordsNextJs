import React from "react";
import { useContext, useState } from "react";
import userContext from "../context/userContext";

const InnerNavbar = () => {
  const user = useContext(userContext);

  const dashboard =
    user.userState.type === "Admin" ? "School Dashboard" : "Student Dashboard";

  const navContent = {
    1: dashboard,
    2: "Add Student",
    2.1: "Student Profile",
    3: "View Records",
    4: "Mark Attendence",
    4.1: "View Attendence",
    5: "Assignment",
    6: "Marks Card",
    7: "Time Table",
    8:"View Assignment"
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
