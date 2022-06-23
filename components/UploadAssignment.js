import React from "react";
import ReactApexChart from "react-apexcharts";
import box from "./box.module.css";

const UploadAssignment = () => {
  const state = {
    series: [

      {
        name: "Section A",
        data: [4, 5, 4, 7, 2] ,


      },
      {
        name: "Section B",
        data: [3, 2, 2, 8, 3],
      },
      {
        name: "Section C",
        data: [1, 7, 5, 1, 3],
      },
      {
        name: "Section D",
        data: [2, 7, 2, 3, 2],
      },
      
    ],
    options: {
      title:{
        text:"Student Details",
        style:{
          color:"white",

        }
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
        title:{
          text:"Number of Classes",
          style:{
            color:"white",
            fontSize:'15',
            color:'white'
          }
        },
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
        ],
        labels: {
          style:{
            colors:["white" ,"white","white" ,"white" ,"white" , ]           
          }
        },
      },
      
      yaxis:{
        show:true,
        min: 0,
        max: 22,
        tickAmount: 12, // this will control the jump between the numbers 
        title:{
          text:"Name of Students",
          offsetX: -5,
          style:{
            color:"white",
            fontSize:'15',
            color:'white',

          }
        },
       
        labels: {
          show:true,
          offsetX: -5,
          style:{
            colors:["white" ,"white","white" ,"white" ,"white" , ] 
          }
        },


      },
      legend: {
        position: "right",
        labels: {
          style:{
            colors:["white" ,"white","white" ,"white" ]           
          }
        },

        // offsetY: 40,
      },
      dataLabels:{
        enabled:true
      },
      
      
grid: {
  show: true,
  borderColor: '#90A4AE',
  strokeDashArray: 0,
  position: 'back',
  xaxis: {
      lines: {
          show: false
      }
  },   
  yaxis: {
      lines: {
          show: false
      }
  },  
  row: {

      opacity: 0.5
  },  
  column: {
      opacity: 0.5
  },  
  padding: {
      top:  10,
      right: 0,
      bottom: 0,
      left: 20
  },  
},



      stroke: {
        width: 1,
        colors: ['#fff']
      },
      fill: {
        opacity: 1,
        
      },
      theme: {
        monochrome: {
          enabled: false,
          shadeTo: 'light',
          shadeIntensity: 1,
        }
      },
      

    },
    
  };
  return (
    <>
      <div id={box.chart}>
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

export default UploadAssignment;
