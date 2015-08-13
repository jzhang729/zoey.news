import React from 'react'

var BarChart = require("react-chartjs").Bar;
var TimeSlider = require('react-time-slider');

var data1BarFill = "blue";
var data1BarOutline = "blue";
var data1Highlight = "blue";

var data2BarFill = "yellow";
var data2BarOutline = "yellow";
var data2Highlight = "yellow";

function generateRandom (min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


var data = {
    labels: [],
    datasets: [
        {
            label: "My First dataset",
            fillColor: data1BarFill,
            strokeColor: data1BarOutline,
            highlightFill: data1Highlight,
            highlightStroke: data1Highlight,
            data: []
        },
        {
            label: "My Second dataset",
            fillColor: data2BarFill,
            strokeColor: data2BarOutline,
            highlightFill: data2Highlight,
            highlightStroke: data2Highlight,
            data: []
        }
    ]
};

var words = "Today I went to the park and I saw a few dogs";
var wordArray = words.split(" ");

wordArray = shuffleArray(wordArray);

for(var i = 0; i < 10; i++) {
    data.labels.push(wordArray[i]);
}

for(var i = 0; i < words.length; i++) {
    data.datasets[0].data.push(generateRandom(0,100));
    data.datasets[1].data.push(generateRandom(0,100));
}

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
  render: function() {
    return (
    <div>
      <BarChart className="chart" data={data} options={options} />
    </div>
    )
  }
})