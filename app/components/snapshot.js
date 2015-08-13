import React from 'react'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

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
  mixins: [FluxMixin, StoreWatchMixin("SnapShotStore")],
  getStateFromFlux: function(){
    var startDate = this.getFlux().store("SnapShotStore").getStartDate()
    var endDate = this.getFlux().store("SnapShotStore").getEndDate()
    return {
      chartdata: this.getFlux().store("SnapShotStore").getSnapShot() 
    }
  },
  componentDidMount: function() {
    this.getFlux().actions.loadChart();
  },
  swapChart: function(){
    this.getFlux().actions.updateChart();
  },
  render: function() {

    console.log(this.state.chartdata)
    return (
      <div>
        <BarChart className="chart" data={this.state.chartdata} options={options} />
        <h2 onClick={this.swapChart}>Hello</h2>
        <h3>Testing a custom font</h3>
      </div>
    )
  }
})