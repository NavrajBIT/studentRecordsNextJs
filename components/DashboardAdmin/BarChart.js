import React from "react";
import Chart from "react-apexcharts";
// import "../../src/App.css"
import dash from "./dash.module.css";
function BarChart() {
  return (
    <>
      <div className={dash.bar_container}>
        <Chart
          type="bar"
          width={600}
          
          height={400}
          series={[
            {
              name: "Social Media ",
              // data: [1, 2, 3, 4, 5, 6, 7, 8 ],
              data: [5, 3, 7, 5, 5, 8, 5, 9, 10, 3],

              // data: [

              // {
              //   x: 3,
              //   y: 2,
              //   goals: [
              //     {
              //       name: 'Anubhav',
              //       value: 2,
              //       strokeColor: '#775DD0',
              //       color: 'black',
              //     },
              //   ],
              //   legend: {
              //     show: true,
              //     showForSingleSeries: true,
              //     customLegendItems: ['Actual', 'Expected'],
              //     markers: {
              //       fillColors: ['#00E396', '#775DD0'],
              //     },
              //   },
              // },
              // ],
            },
          ]}
          //   options={{
          //     colors: ['#f90000', 'black'],

          //     theme: { mode: 'light', backgroundColor: 'black' },
          //     style: { fontSize: '15', colors: ['blue', 'blue'] },
          //     // colors:["green" , "black" , "red"],
          //     stroke: {
          //       width: 1,
          //       colors: ['#fff'],
          //     },

          //     xaxis: {
          //       colors: 'black',
          //       tickPlacement: 'on',
          //       labels: {
          //         formatter: (val) => {
          //           return `${val}`
          //         },
          //       },
          //       categories: ['F', 'T', 'L', 'I', 'G', 'S', 'Y', 'Y' ,'K', 'R'],
          //       colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          //   '#f48024', '#69d2e7'
          // ],
          //       labels: {
          //         style: { fontSize: '15', colors: 'white' },
          //       },

          //       title: {
          //         text: 'Student',
          //         style: { color: 'white', fontSize: '15' },
          //       },
          //     },

          //     yaxis: {
          //       labels: {
          //         formatter: (val) => {
          //           return `${val}`
          //         },
          //         style: { fontSize: '15', colors: ['white'], backgroundColor: 'black' },
          //       },
          //       title: {
          //         text: 'Study Time',
          //         style: { color: 'white', fontSize: '15' },
          //       },
          //     },

          //     legend: {
          //       show: true,
          //       // show: false,

          //       position: 'left',
          //     },

          //     dataLabels: {
          //       formatter: (val) => {
          //         return `${val}`
          //       },
          //       style: {
          //         colors: ['#f4f4f4'],
          //         fontSize: 15,
          //       },
          //     },
          //   }}

          options={{
            plotOptions: {
              bar: {
                barHeight: "100%",
                distributed: true,
                horizontal: false,
                // colors:["black" , 'white'],
                dataLabels: {
                  position: "bottom",
                },
              },
            },
            colors: [
              "#33b2df",
              "#546E7A",
              "#d4526e",
              "#13d8aa",
              "#A5978B",
              "#2b908f",
              "#f9a3a4",
              "#90ee7e",
              "#f48024",
              "#69d2e7",
            ],
            dataLabels: {
              enabled: true,
              textAnchor: "start",
              style: {
                width: 8,
                colors: ["white"],
              },
              // formatter: function (val, opt) {
              //   return opt.w.globals.labels[opt.dataPointIndex]
              // },
              offsetX: -10,
              dropShadow: {
                enabled: true,
              },
            },
            stroke: {
              width: 1,
              colors: ["white"],
            },
            xaxis: {
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
              // categories: ['Faluda', 'Taluda', 'Laluda', 'Ilida', 'Guda', 'Suda', 'Yoda', 'Loda', 'Koda', 'Roda'],
              labels: {
                style: {
                  fontSize: "15",
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
                  // backgroundColor: 'black',
                },
              },
            },
            yaxis: {
              logBase: 10,
              min: 0,
              max: 10,
              labels: {
                style: {
                  fontSize: "15",
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
            labels: ["Apples", "Oranges", "Berries", "Grapes"],
            title: {
              text: "Total Number of Students In Each Class",
              align: "center",
              // floating: true,
              style: { color: "white", fontSize: "12" },
            },
            tooltip: {
              enabled: true,
              enabledOnSeries: true,
              // shared: true,
              followCursor: true,

              theme: "dark",
              style: {
                fontSize: "12px",
              },
            },
            grid: {
              enabled: false,
              xaxis: {
                lines: {
                  show: false,
                },
              },
              yaxis: {
                lines: {
                  show: false,
                },
              },
              // position: 'front',
            },
            legend: {
              show: false,

              // labels: {
              //   colors: 'white',
              //   useSeriesColors: false,
              // },
            },
            chart: {
              toolbar: {
                
                show: false,
                offsetX: 10,
                offsetY: 10,
                fill:{
                  colors:["black"]
              },
                text:"black",
                
                tools: {
    
                  download: true,
                  selection: false,
                  zoom: false,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                   
                },
              },
              
            },
            // subtitle: {
            //     text: 'Category Names as DataLabels inside bars',
            //     align: 'center',
            //     style: { color: 'white', fontSize: '15' },
            // },
            // tooltip: {
            //   theme: 'light',
            //   x: {
            //     show: true,
            //     Labels:{
            //       style: { fontSize: '15', colors: ['white'], backgroundColor: 'black' },
            //     }
            //   },
            //   y: {
            //     title: {
            //       style: { color: 'white', fontSize: '15' },
            //       formatter: function () {
            //         return ''
            //       }
            //     }
            //     ,
            //     Labels:{
            //       style: { fontSize: '15', colors: ['white'], backgroundColor: 'black' },
            //     }
            //   }
            // }
          }}
        />
      </div>
    </>
  );
}

export default BarChart;
