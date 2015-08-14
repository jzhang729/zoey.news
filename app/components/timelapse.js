import React from 'react'
var LineChart = require("react-chartjs").Line;

var dataSet1 = "blue";
var dataSet2 = "green";
var highlight = "red";

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: dataSet1,
            strokeColor: dataSet1,
            pointColor: dataSet1,
            pointStrokeColor: highlight,
            pointHighlightFill: highlight,
            pointHighlightStroke: dataSet1,
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: dataSet2,
            strokeColor: dataSet2,
            pointColor: dataSet2,
            pointStrokeColor: highlight,
            pointHighlightFill: highlight,
            pointHighlightStroke: dataSet2,
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

var options = {

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,0.3)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

export default React.createClass({
  render: function() {
    return (
      <div className="chart-container">
        <span className="chart-title" onClick={this.swapChart}>Line Chart</span>
        <LineChart className="chart" data={data} options={options} />
      </div>
    )
  }
})


 
