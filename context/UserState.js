import React, { useState } from "react";
import UserContext from "./userContext";
import '../components/viewassignment'
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
      {userState.id == 8 && <viewassignment/>}
    </UserContext.Provider>
  );
};

export default UserState;
