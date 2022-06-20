import React from "react";
// import Admindash from "../components/DashboardAdmin/Admindash";

import dynamic from "next/dynamic";

const Admindash = dynamic(
  () => import("../components/DashboardAdmin/Admindash"),
  { ssr: false }
);

const KPI = () => {
  return (
    <div>
      <Admindash />
    </div>
  );
};

export default KPI;
