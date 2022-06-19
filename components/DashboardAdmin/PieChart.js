import { useState } from 'react';
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);

// Chart.defaults.elements.bar.borderWidth = 10;

 
function PieChart(props) {
  const [data, setData] = useState({
    
    datasets: [{
        data: [props.male, props.female],
        backgroundColor:[
          '#69d2e7',
          '#f9a3a4'
        ],
        radius:'90%',
        hoverOffset:12,
        

    },
    
  ],
  labels: [
      'Male',
      'Female',
  ], 
  
   
 

});

  
  return (
    <>
      {/* <Doughnut data={data}/> */}
      <div className="pieChartStyle" >
        <Pie data={data} />
      </div>
    </>
      
    
  );
}

export default PieChart;