import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

import { useState, useEffect } from "react";
import { getGenderKPI } from "../../api/contractCall";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

// Chart.defaults.elements.bar.borderWidth = 10;

function PieChart() {
  const [totalNumber, settotalNumber] = useState(0);
  const [maleNumber, setmaleNumber] = useState(0);
  const [femaleNumber, setfemaleNumber] = useState(0);

  const [data, setData] = useState({
    datasets: [
      {
        data: [4505, 3495],
        backgroundColor: ["#69d2e7", "#f9a3a4"],
        radius: "90%",
        hoverOffset: 12,
      },
    ],
    labels: ["Male", "Female"],
  });

  // useEffect(() => {
  //   getGenderKPI().then((res) => {
  //     console.log(res)
  //     settotalNumber(res.totalNumber);
  //     setmaleNumber(res.maleNumber);
  //     setfemaleNumber(res.femaleNumber);
  //     setData({
  //       datasets: [
  //         {
  //           data: [res.maleNumber, res.femaleNumber],
  //           backgroundColor: ["#69d2e7", "#f9a3a4"],
  //           radius: "90%",
  //           hoverOffset: 12,
  //         },
  //       ],
  //       labels: ["Male", "Female"],
  //     });
  //   });
  // }, []);

  return (
    <div>
      {/* <Doughnut data={data}/> */}

      <div className="pieChartStyle">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default PieChart;
