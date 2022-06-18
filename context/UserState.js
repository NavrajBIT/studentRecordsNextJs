import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userView, setUserView] = useState(1);

  const updateState = (usertype, userId, userView) => {
    setUserType(usertype);
    setUserId(userId);
    setUserView(userView);
  };

  const userState = {
    type: userType,
    id: userId,
    view: userView,
  };
  return (
    <UserContext.Provider value={{ userState, updateState }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
