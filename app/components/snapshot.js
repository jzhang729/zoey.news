import React from 'react'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React);
var BarChart = require("react-chartjs").Bar;

var data1BarFill = "blue";
var data1BarOutline = "blue";
var data1Highlight = "blue";

var data2BarFill = "yellow";
var data2BarOutline = "yellow";
var data2Highlight = "yellow";

var options = {

    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - If there is a stroke on each bar
    barShowStroke : true,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 2,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 5,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return { 
      chartdata: {
          labels: ["ISIS", "terror", "RCMP"],
          datasets: [
            {
                label: "Globe and Mail",
                data: [10, 20, 30]
            },
            {
                label: "Vancouver Sun",
                data: [4, 50, 10]
            },
            {
                label: "National Post",
                data: [12, 15, 40]
            }
          ]
      }
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.loadChart(["ISIS", "terror"], [1, 2], ["2015-08-02", "2015-08-07"]);
  },

  render: function() {
    return (
      <BarChart className="barchart" data={this.state.chartdata} options={options} />
    )
  }
})