import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataDoughnut: {
      labels: ["Red", "Green", "Yellow", "Orange", "Red"],
      datasets: [
        {
          data: [120, 50, 100, 40, 200],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774"
          ]
        }
      ],
      text: "30%"
    }
  };

  render() {
    return (
      <Doughnut
        data={this.state.dataDoughnut}
        options={{ responsive: true, maintainAspectRatio: false }}
        height={500}
        width={700}
      />
    );
  }
}

export default PieChart;
