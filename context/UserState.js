import React, { useState } from "react";
import UserContext from "./userContext";
import '../components/viewassignment'
const UserState = (props) => {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userView, setUserView] = useState(1);
  const [userSidebar, setUserSidebar] = useState(true);


  const updateState = (usertype, userId, userView , userSidebar) => {
    setUserType(usertype);
    setUserId(userId);
    setUserView(userView);
    setUserSidebar(userSidebar)
  };

  const userState = {
    type: userType,
    id: userId,
    view: userView,
    sidebar : userSidebar
  };
  return (
    <UserContext.Provider value={{ userState, updateState }}>
      {props.children}
      {userState.id == 8 && <viewassignment/>}
    </UserContext.Provider>
  );
};

export default UserState;
