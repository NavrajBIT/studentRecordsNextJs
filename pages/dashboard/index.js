import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import AppContent from "../../components/appContent";

import { useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { useRouter } from "next/dist/client/router";
const Layout = () => {
  const user = useContext(userContext);
  const router = useRouter();
  useEffect(() => {
    if (user.userState.type === null) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="pageLayout">
        <Sidebar />
        <AppContent />
      </div>
    </>
  );
};

export default Layout;
