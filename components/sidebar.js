import React from "react";
import { useContext, useState } from "react";
import userContext from "../context/userContext";

const Sidebar = () => {
  const user = useContext(userContext);
  const [attendanceToggle, setAttendanceToggle] = useState(false);

  return (
    <>
      <div className="sidebar" id="sidbar">
        <h1
          onClick={() => {
            user.updateState(user.userState.type, user.userState.id, 1);
          }}
        >
          {" "}
          Dashboard
        </h1>
        {user.userState.type === "Admin" ? (
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
              Attendence{" "}
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
              Marks card
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7);
              }}
            >
              Time Table
            </div>
          </>
        ) : (
          <>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 4.1);
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
              Marks card
            </div>
            <div
              className="sidebar-item"
              onClick={() => {
                user.updateState(user.userState.type, user.userState.id, 7);
              }}
            >
              Time Table
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
