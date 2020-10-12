import React, { Component } from "react";
import Chart from "react-apexcharts";
export default class Column_chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: this.props.data,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: ["red", "blue", "green", "yellow"],
        plotOptions: {
          bar: {
            columnWidth: "55%",
            distributed: true,
            colors: ["red", "blue", "green", "yellow"],
            fill: {
              colors: ["red", "blue", "green", "yellow"],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            "Amber",
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"],
          ],
          labels: {
            style: {
              colors: ["red", "blue", "green", "yellow"],
              fontSize: "12px",
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <div>
        <div id="chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    );
  }
}
