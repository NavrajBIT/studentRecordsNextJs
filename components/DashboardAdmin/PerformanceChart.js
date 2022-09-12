import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// import ReactApexChart from "react-apexcharts";
// import box from "./box.module.css";

const PerformanceChart = (props) => {
  const state = {
    series: [
      {
        name: "Passed",
        data: [
          props.performanceData[0]["passedStudents"],
          props.performanceData[1]["passedStudents"],
          props.performanceData[2]["passedStudents"],
          props.performanceData[3]["passedStudents"],
          props.performanceData[4]["passedStudents"],
          props.performanceData[5]["passedStudents"],
          props.performanceData[6]["passedStudents"],
          props.performanceData[7]["passedStudents"],
          props.performanceData[8]["passedStudents"],
          props.performanceData[9]["passedStudents"],
        ],
      },
      {
        name: "Failed",
        data: [
          props.performanceData[0]["failedStudents"],
          props.performanceData[1]["failedStudents"],
          props.performanceData[2]["failedStudents"],
          props.performanceData[3]["failedStudents"],
          props.performanceData[4]["failedStudents"],
          props.performanceData[5]["failedStudents"],
          props.performanceData[6]["failedStudents"],
          props.performanceData[7]["failedStudents"],
          props.performanceData[8]["failedStudents"],
          props.performanceData[9]["failedStudents"],
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
        text: "Performance Indicator",
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
          enabled: true,
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
              labels: { colors: "white", useSeriesColors: true },
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 1,
        },
      },
      xaxis: {
        title: {
          text: "Batch",
          style: {
            color: "white",
            fontSize: "15",
            color: "white",
          },
        },
        categories: [
          props.performanceData[0]["batch"],
          props.performanceData[1]["batch"],
          props.performanceData[2]["batch"],
          props.performanceData[3]["batch"],
          props.performanceData[4]["batch"],
          props.performanceData[5]["batch"],
          props.performanceData[6]["batch"],
          props.performanceData[7]["batch"],
          props.performanceData[8]["batch"],
          props.performanceData[9]["batch"],
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
        max: 200,
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
        style: {
          colors: ["white"],
        },
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
        {typeof window !== "undefined" && (
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        )}
      </div>
    </>
  );
};

export default PerformanceChart;
