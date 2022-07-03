import React from "react";
import ReactApexChart from "react-apexcharts";
// import box from "./box.module.css";

const BarChart = (props) => {
  const state = {
    series: [
      {
        name: "Section A",
        data: [
          props.studentData[0]["a"],
          props.studentData[1]["a"],
          props.studentData[2]["a"],
          props.studentData[3]["a"],
          props.studentData[4]["a"],
          props.studentData[5]["a"],
          props.studentData[6]["a"],
          props.studentData[7]["a"],
          props.studentData[8]["a"],
          props.studentData[9]["a"],
        ],
      },
      {
        name: "Section B",
        data: [
          props.studentData[0]["b"],
          props.studentData[1]["b"],
          props.studentData[2]["b"],
          props.studentData[3]["b"],
          props.studentData[4]["b"],
          props.studentData[5]["b"],
          props.studentData[6]["b"],
          props.studentData[7]["b"],
          props.studentData[8]["b"],
          props.studentData[9]["b"],
        ],
      },
      {
        name: "Section C",
        data: [
          props.studentData[0]["c"],
          props.studentData[1]["c"],
          props.studentData[2]["c"],
          props.studentData[3]["c"],
          props.studentData[4]["c"],
          props.studentData[5]["c"],
          props.studentData[6]["c"],
          props.studentData[7]["c"],
          props.studentData[8]["c"],
          props.studentData[9]["c"],
        ],
      },
      {
        name: "Section D",
        data: [
          props.studentData[0]["d"],
          props.studentData[1]["d"],
          props.studentData[2]["d"],
          props.studentData[3]["d"],
          props.studentData[4]["d"],
          props.studentData[5]["d"],
          props.studentData[6]["d"],
          props.studentData[7]["d"],
          props.studentData[8]["d"],
          props.studentData[9]["d"],
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
        categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
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
        max: 22,
        tickAmount: 12, // this will control the jump between the numbers
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
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </>
  );
};

export default BarChart;
