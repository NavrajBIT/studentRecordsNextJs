import React, { useState } from "react";
import UserContext from "./userContext";
import "../components/Viewassignment";
const UserState = (props) => {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userView, setUserView] = useState(1);
  const [sidebar, setSidebar] = useState(true);

  const updateState = (usertype, userId, userView, sidebarView) => {
    setUserType(usertype);
    setUserId(userId);
    setUserView(userView);
    setSidebar(sidebarView);
  };

  const userState = {
    type: userType,
    id: userId,
    view: userView,
    sidebar: sidebar,
  };
  return (
    <UserContext.Provider value={{ userState, updateState }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
