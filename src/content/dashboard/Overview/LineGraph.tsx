import { Line } from "react-chartjs-2";
import {
    Card,
    CardHeader
  } from '@mui/material';


function LineGraph() {
  
    
    const data = {
    labels: ["February", "March", "April", "May", "June"],

    datasets: [
      {
        label: "Profit",
        fill: false,
        borderColor: "red",
        borderWidth: 3,
        pointRadius: 2,
        data: [1455, 295, 899, 921, 432]
      },
      {
        label: "Income",
        fill: false,
        borderColor: "orange",
        borderWidth: 3,
        pointRadius: 2,
        data: [64, 51, 454, 321, 502]
      },
      {
        label: "Expenses",
        fill: false,
        borderColor: "blue",
        borderWidth: 3,
        pointRadius: 2,
        data: [122, 24, 16, 233, 117]
      }
    ]
  };

  var options = {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 10
      }
    
    },
    scales: {
      xAxes: [
        {
          ticks: {
              display: true,
              fontFamily: "Roboto"
            }
        }
      ]
    }
  };

  return (
      <Card>
        <CardHeader title="Monthly Cash Flow"/>
        <Line data={data} options={options} />
      </Card>
  );
}

export default LineGraph;
