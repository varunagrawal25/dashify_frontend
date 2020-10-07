import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class BarChart extends React.Component {
  state = {
    dataBar: {
      labels: ["09", "10", "11", "12", "13", "14", "15"],
      datasets: [
        {
          label: "phone call",
          data: [130, 100, 120, 135, 140],
          backgroundColor: "blue",
          barThickness: 10
        },
        {
          label: "get direction",
          data: [100, 120, 100],
          backgroundColor: "rgba(255, 134,159,0.4)",
          barThickness: 10
        },
        {
          label: "website visited",
          data: [120, 120, 120],
          backgroundColor: "rgba(255, 134,159,0.4)",
          barThickness: 10
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
     

      legend: {
        position: "bottom"
      },

      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: false,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true,
              stepSize: 25,
              max: 125
            }
          }
        ]
      }
    }
  };

  render() {
    return (
      <Bar data={this.state.dataBar} options={this.state.barChartOptions}   />
    );
  }
}

export default BarChart;
