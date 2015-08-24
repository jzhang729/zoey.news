import React from 'react'
import Fluxxor from 'fluxxor'

var LineChart = require("react-chartjs").Line;
var FluxMixin = Fluxxor.FluxMixin(React);

var options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,0.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 2,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
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
        <LineChart className="chart"
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

// Experimenting with this code to control whether to redraw entire chart
// redraw={this.props.chartParams.shouldRedraw}
