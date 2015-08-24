import React from 'react'
import Fluxxor from 'fluxxor'

var DonutChart = require("react-chartjs").Doughnut;
var FluxMixin = Fluxxor.FluxMixin(React);

var options = {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",

    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,

    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect
    animationEasing : "easeOutBounce",

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
};

export default React.createClass({

  mixins: [FluxMixin],

  componentDidMount: function() {
    this.getFlux().actions.loadChartData(this.props.chartID);
  },

  render: function() {

    var chart;

    if(this.props.data){
      chart = (
        <DonutChart className="chart"
                    data={this.props.data}
                    options={options}
        />
      )
    } else {
      chart = (<div className="loading"><img src="/img/loading.gif" /></div>)
    }
    return (
      <div>
        {chart}
      </div>
    )
  }
})
