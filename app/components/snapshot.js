import React from 'react'
import Fluxxor from 'fluxxor'
import ColorRandomizer from './colorrandomizer'
import KeywordList from './keywordlist'
import KeywordAdd from './keywordadd'
import PublisherList from './publisherlist'

var BarChart = require("react-chartjs").Bar;

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var options = {

    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

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
      chartdata: this.getFlux().store("SnapShotStore").getSnapShot(),
      keywordlist: this.getFlux().store("SnapShotStore").getKeywords(),
      publisherlist: this.getFlux().store("SnapShotStore").getPublishers()
    }
  },
  componentDidMount: function() {
    this.getFlux().actions.loadChartData(this.state.keywordlist, this.state.publisherlist);
  },
  addKeyword: function(keyword){
    this.getFlux().actions.addKeyword(keyword);
  },
  addPublisher: function(publisher){
    this.getFlux().actions.addPublisher(publisher);
  },
  changeStartDate: function(d){
    this.getFlux().actions.changeStartDate(d);
  },
  changeEndDate: function(d){
    this.getFlux().actions.changeEndDate(d);
  },
  showLeft: function() {
    this.refs.left.show();
  },
  render: function() {
    return (
      <div>
      <div className="chart-container">

      <BarChart className="chart" data={this.state.chartdata} options={options} redraw />
      <KeywordList className="keyword-list" list={this.state.keywordlist} />
      </div>
      <ul>
        <KeywordAdd />
        <button onClick={this.addKeyword.bind(this, "terror")}>TERROR</button><br />
        <button onClick={this.addPublisher.bind(this, 2)}>add National Post</button><br />
        <button onClick={this.changeStartDate.bind(this, "2015-08-02")}>start is Aug 2</button><br />
        <button onClick={this.changeEndDate.bind(this, "2015-08-06")}>end is Aug 6</button>
      </ul>
      </div>
    )
  }
})

// <PublisherList list={this.state.publisherlist} />

// <span className="chart-title">Bar Chart</span>

// let labels = this.state.chartdata.datasets.map((data) => {
//   return <li>{data.label}</li>
// });

// {labels}\
