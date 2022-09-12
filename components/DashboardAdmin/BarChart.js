import React from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// import box from "./box.module.css";
import { useState, useEffect } from "react";
import { getStudentsInGradeSection } from "../../api/contractCall";

const BarChart = () => {
  // const [count1a, setCount1a] = useState(5);
  // const [count1b, setCount1b] = useState(6);
  // const [count1c, setCount1c] = useState(9);
  // const [count1d, setCount1d] = useState(50);
  // const [count2a, setCount2a] = useState(0);
  // const [count2b, setCount2b] = useState(0);
  // const [count2c, setCount2c] = useState(0);
  // const [count2d, setCount2d] = useState(0);
  // const [count3a, setCount3a] = useState(0);
  // const [count3b, setCount3b] = useState(0);
  // const [count3c, setCount3c] = useState(0);
  // const [count3d, setCount3d] = useState(0);
  // const [count4a, setCount4a] = useState(0);
  // const [count4b, setCount4b] = useState(0);
  // const [count4c, setCount4c] = useState(0);
  // const [count4d, setCount4d] = useState(0);
  // const [count5a, setCount5a] = useState(0);
  // const [count5b, setCount5b] = useState(0);
  // const [count5c, setCount5c] = useState(0);
  // const [count5d, setCount5d] = useState(0);
  // const [count6a, setCount6a] = useState(0);
  // const [count6b, setCount6b] = useState(0);
  // const [count6c, setCount6c] = useState(0);
  // const [count6d, setCount6d] = useState(0);
  // const [count7a, setCount7a] = useState(0);
  // const [count7b, setCount7b] = useState(0);
  // const [count7c, setCount7c] = useState(0);
  // const [count7d, setCount7d] = useState(0);
  // const [count8a, setCount8a] = useState(0);
  // const [count8b, setCount8b] = useState(0);
  // const [count8c, setCount8c] = useState(0);
  // const [count8d, setCount8d] = useState(0);
  // const [count9a, setCount9a] = useState(0);
  // const [count9b, setCount9b] = useState(0);
  // const [count9c, setCount9c] = useState(0);
  // const [count9d, setCount9d] = useState(0);
  // const [count10a, setCount10a] = useState(0);
  // const [count10b, setCount10b] = useState(0);
  // const [count10c, setCount10c] = useState(0);
  // const [count10d, setCount10d] = useState(0);

  const count1a = 241;
  const count1b = 159;
  const count1c = 200;
  const count1d = 201;
  const count2a = 250;
  const count2b = 220;
  const count2c = 173;
  const count2d = 159;
  const count3a = 150;
  const count3b = 232;
  const count3c = 177;
  const count3d = 276;
  const count4a = 224;
  const count4b = 200;
  const count4c = 153;
  const count4d = 223;
  const count5a = 150;
  const count5b = 204;
  const count5c = 188;
  const count5d = 285;
  const count6a = 181;
  const count6b = 250;
  const count6c = 189;
  const count6d = 182;
  const count7a = 169;
  const count7b = 235;
  const count7c = 153;
  const count7d = 273;
  const count8a = 170;
  const count8b = 167;
  const count8c = 157;
  const count8d = 327;
  const count9a = 170;
  const count9b = 204;
  const count9c = 153;
  const count9d = 322;
  const count10a = 184;
  const count10b = 208;
  const count10c = 160;
  const count10d = 81;

  // useEffect(() => {
  //   getStudentsInGradeSection(1, "a")
  //     .then((res) => {
  //       setCount1a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(1, "b")
  //     .then((res) => {
  //       setCount1b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(1, "c")
  //     .then((res) => {
  //       setCount1c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(1, "d")
  //     .then((res) => {
  //       setCount1d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(2, "a")
  //     .then((res) => {
  //       setCount2a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(2, "b")
  //     .then((res) => {
  //       setCount2b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(2, "c")
  //     .then((res) => {
  //       setCount2c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(2, "d")
  //     .then((res) => {
  //       setCount2d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(3, "a")
  //     .then((res) => {
  //       setCount3a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(3, "b")
  //     .then((res) => {
  //       setCount3b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(3, "c")
  //     .then((res) => {
  //       setCount3c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(3, "d")
  //     .then((res) => {
  //       setCount3d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(4, "a")
  //     .then((res) => {
  //       setCount4a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(4, "b")
  //     .then((res) => {
  //       setCount4b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(4, "c")
  //     .then((res) => {
  //       setCount4c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(4, "d")
  //     .then((res) => {
  //       setCount4d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(5, "a")
  //     .then((res) => {
  //       setCount5a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(5, "b")
  //     .then((res) => {
  //       setCount5b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(5, "c")
  //     .then((res) => {
  //       setCount5c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(5, "d")
  //     .then((res) => {
  //       setCount5d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(6, "a")
  //     .then((res) => {
  //       setCount6a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(6, "b")
  //     .then((res) => {
  //       setCount6b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(6, "c")
  //     .then((res) => {
  //       setCount6c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(6, "d")
  //     .then((res) => {
  //       setCount6d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(7, "a")
  //     .then((res) => {
  //       setCount7a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(7, "b")
  //     .then((res) => {
  //       setCount7b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(7, "c")
  //     .then((res) => {
  //       setCount7c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(7, "d")
  //     .then((res) => {
  //       setCount7d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(8, "a")
  //     .then((res) => {
  //       setCount8a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(8, "b")
  //     .then((res) => {
  //       setCount8b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(8, "c")
  //     .then((res) => {
  //       setCount8c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(8, "d")
  //     .then((res) => {
  //       setCount8d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(9, "a")
  //     .then((res) => {
  //       setCount9a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(9, "b")
  //     .then((res) => {
  //       setCount9b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(9, "c")
  //     .then((res) => {
  //       setCount9c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(9, "d")
  //     .then((res) => {
  //       setCount9d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(10, "a")
  //     .then((res) => {
  //       setCount10a(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(10, "b")
  //     .then((res) => {
  //       setCount10b(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(10, "c")
  //     .then((res) => {
  //       setCount10c(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getStudentsInGradeSection(10, "d")
  //     .then((res) => {
  //       setCount10d(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  const state = {
    series: [
      {
        name: "Section A",
        data: [
          count1a,
          count2a,
          count3a,
          count4a,
          count5a,
          count6a,
          count7a,
          count8a,
          count9a,
          count10a,
        ],
      },
      {
        name: "Section B",
        data: [
          count1b,
          count2b,
          count3b,
          count4b,
          count5b,
          count6b,
          count7b,
          count8b,
          count9b,
          count10b,
        ],
      },
      {
        name: "Section C",
        data: [
          count1c,
          count2c,
          count3c,
          count4c,
          count5c,
          count6c,
          count7c,
          count8c,
          count9c,
          count10c,
        ],
      },
      {
        name: "Section D",
        data: [
          count1d,
          count2d,
          count3d,
          count4d,
          count5d,
          count6d,
          count7d,
          count8d,
          count9d,
          count10d,
        ],
      },
    ],
    options: {
      tooltip: {
        enabled: true,
        followCursor: true,
        theme: "dark",
      },
      title: {
        text: "Student Details",
        style: {
          color: "white",
        },
      },
      chart: {
        type: "bar",
        height: 350,
        stacked: true,

        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      xaxis: {
        title: {
          text: "Number of Classes",
          style: {
            color: "white",
            fontSize: "15",
            color: "white",
          },
        },
        categories: [
          "1st",
          "2nd",
          "3rd",
          "4th",
          "5th",
          "6th",
          "7th",
          "8th",
          "9th",
          "10th",
        ],
        labels: {
          style: {
            colors: [
              "white",
              "white",
              "white",
              "white",
              "white",
              "white",
              "white",
              "white",
              "white",
              "white",
            ],
          },
        },
      },

      yaxis: {
        show: true,
        min: 0,
        max: 900,
        tickAmount: 10, // this will control the jump between the numbers
        title: {
          text: "Number of Students",
          offsetX: -5,
          style: {
            fontSize: "15",
            color: "white",
          },
        },

        labels: {
          show: true,
          offsetX: -5,
          style: {
            colors: ["white", "white", "white", "white", "white"],
          },
        },
      },
      legend: {
        position: "bottom",
        show: true,
        labels: {
          colors: ["white"],
          useSeriesColors: false,
          // text: "#90A4AE",
        },

        // offsetY: 40,
      },
      dataLabels: {
        enabled: true,
        color: "black",
      },

      grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        row: {
          opacity: 0.5,
        },
        column: {
          opacity: 0.5,
        },
        padding: {
          top: 10,
          right: 0,
          bottom: 0,
          left: 20,
        },
      },

      stroke: {
        width: 1,
        colors: ["white"],
      },
      fill: {
        opacity: 1,
      },
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: "dark",
          shadeIntensity: 1,
        },
      },
    },
  };
  return (
    <>
      <div id="box">
        {
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        }
      </div>
    </>
  );
};

export default BarChart;
