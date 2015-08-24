import React from 'react'
import Fluxxor from 'fluxxor'

var BarChart = require("react-chartjs").Bar;
var FluxMixin = Fluxxor.FluxMixin(React);

var options = {
  scaleBeginAtZero : true,
  scaleShowGridLines : true,
  scaleGridLineColor : "rgba(0,0,0,0.05)",
  scaleGridLineWidth : 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  barShowStroke : true,
  barStrokeWidth : 2,
  barValueSpacing : 2,
  barDatasetSpacing : 1,
  // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};

export default React.createClass({

  mixins: [FluxMixin],

  componentDidMount: function() {
    this.getFlux().actions.loadChartData(this.props.chartID);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (this.props.data != nextProps.data)
  },
  
  render: function() {

    var chart;

    if(this.props.data){
      chart = (
        <BarChart className="chart"
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
