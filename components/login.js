import React from "react";
import { useState, useContext } from "react";
import userContext from "../context/userContext";
import { checkLogin } from "../api/contractCall";
import { useRouter } from "next/router";

const Login = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const user = useContext(userContext);
  const router = useRouter();

  const loginUser = async () => {
    setStatus("logging in...");
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("userPassword").value;
    await checkLogin(userName, password)
      // // .then((res) => {
      // //   if (res.status === "Failed") {
      // //     setStatus("Something went wrong. Please try again.");
      // //   } else {
      // //     if (res.loginType === "Unauthorized") {
      // //       setStatus("Username or Password incorrect.");
      // //     } else {
      // //       setStatus("");
      // //       console.log(res);
      // //       user.updateState(res.loginType, res.userId, 1);
            user.updateState("Admin", 1, 1);

            router.push("/dashboard");
      // //     }
      // //   }
      // // })
      // // .catch((err) => {
      // //   setStatus("Something went wrong. Please try again.");
      // // });
  };
  return (
    <>
      <div className="logo">
        <img
          src="https://beimagine.tech/wp-content/uploads/2022/04/BITlogo-white.png"
          alt=""
          width="150px"
        />
      </div>
      <div className="clientlogo">
        <img
          src="https://kvsangathan.nic.in/sites/all/themes/kvs/logo.png"
          alt=""
          width="100px"
        />
      </div>
      <div className="login-page">
        <div className="login-container">
          <h1>Login Details</h1>
          <div className="inputField">
            <input
              type="text"
              placeholder="Your username"
              style={{ backgroundImage: "url('./username.svg')" }}
              id="userName"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="inputField">
            <input type="text" placeholder="Password" id="userPassword" />
          </div>

          <div className="checkbox">
            <input type="checkbox" placeholder="Your Password" /> Remember me
          </div>
          <div className="status">{status}</div>
          <button
            onClick={() => {
              loginUser();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
