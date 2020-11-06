import React, { Component } from 'react'
import ReactApexChart from "react-apexcharts";
export default class Radial_chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [76, 67],
          options: {
            chart: {
              
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                offsetY: 0,
                startAngle: 0,
                endAngle: 270,
                hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
                },
                dataLabels: {
                  name: {
                    show: false,
                  },
                  value: {
                    show: true,
                  }
                }
              }
            },
            colors: [  '#8264C6' , '#5D80E2', '#39539E', '#0077B5'],
            labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
            legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 160,
              offsetY: 15,
              labels: {
                useSeriesColors: true,
              },
              markers: {
                size: 0
              },
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
                vertical: 3
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                    show: false
                }
              }
            }]
          },
        
        
        };
      }

    

      render() {
        return (
          

    <div id='chart'>
<ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={199}/>
</div>
        )
      }
}
