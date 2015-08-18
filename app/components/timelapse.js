import React from 'react'
import Fluxxor from 'fluxxor'

var LineChart = require("react-chartjs").Line;
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

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
  mixins: [FluxMixin, StoreWatchMixin("SnapShotStore")],

  getStateFromFlux: function(){
    return {
      chartdata: this.getFlux().store("SnapShotStore").getSnapShot(this.props.chartParams.chartID),
      // keywordlist: this.getFlux().store("SnapShotStore").getKeywords(this.props.chartParams.chartID),
      // publisherlist: this.getFlux().store("SnapShotStore").getPublishers(this.props.chartParams.chartID),
      // startDate: this.getFlux().store("SnapShotStore").getStartDate(this.props.chartParams.chartID),
      // endDate: this.getFlux().store("SnapShotStore").getEndDate(this.props.chartParams.chartID),
      allDates: this.getFlux().store("SnapShotStore").getAllDates(this.props.chartParams.chartID)
    }
  },
  componentDidMount: function() {
    this.getFlux().actions.loadChartData(this.props.chartParams.chartID, this.props.chartParams.keywords, this.props.chartParams.publishers);
  },

  render: function() {
    return (
      <div className="chart-container">
        <LineChart className="chart" data={this.state.chartdata} options={options} redraw />
      </div>
    )
  }
})


 
