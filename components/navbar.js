import { useContext, useState, useEffect } from "react";
import userContext from "../context/userContext";
import { useRouter } from "next/dist/client/router";
import { getStudentData } from "../api/contractCall";

const Navbar = () => {
  const user = useContext(userContext);
  const [myName, setMyName] = useState("_name_");
  const router = useRouter();
  useEffect(() => {
    if (user.userState.type === "Admin") {
      setMyName("Admin");
    } else {
      getStudentData(user.userState.id)
        .then((res) => {
          setMyName(res.studentName);
        })
        .catch((err) => {
          setMyName("student");
        });
    }
  }, []);
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <img
            src="https://kvsangathan.nic.in/sites/all/themes/kvs/logo.png"
            alt="Hughes Chem"
            width="100"
            height="50"
          />
        </div>
        <div className="navbar-right">
          {myName}
          <div style={{ margin: "0px 20px" }}>
            <button
              onClick={() => {
                router.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
