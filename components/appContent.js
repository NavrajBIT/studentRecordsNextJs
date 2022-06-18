import React from "react";
import InnerNavbar from "./innerNavbar";
import AddStudent from "./addStudent";
import ViewRecords from "./viewRecords";
import Assignment from "./assignment";
import MarksCard from "./marksCard";
import Profile from "./profile";
import TimeTable from "./timeTable";
import KPI from "./kpi";
import AttendanceView from "./attendanceView";
import AttendanceViewStudent from "./attendanceViewStudent";

import { useContext } from "react";
import userContext from "../context/userContext";
import AttendanceMark from "./attendanceMark";

const AppContent = () => {
  const user = useContext(userContext);
  return (
    <>
      <div className="formPage">
        <InnerNavbar />
        {user.userState.view === 1 && user.userState.type === "Student" && (
          <Profile />
        )}
        {user.userState.view === 1 && user.userState.type === "Admin" && (
          <KPI />
        )}
        {user.userState.view === 2 && <AddStudent />}
        {user.userState.view === 2.1 && <Profile />}
        {user.userState.view === 3 && <ViewRecords />}
        {user.userState.view === 4 && <AttendanceMark />}
        {user.userState.view === 4.1 && <AttendanceView />}
        {user.userState.view === 4.2 && <AttendanceViewStudent />}
        {user.userState.view === 5 && <Assignment />}
        {user.userState.view === 6 && <MarksCard />}
        {user.userState.view === 7 && <TimeTable />}
      </div>
    </>
  );
};

export default AppContent;
