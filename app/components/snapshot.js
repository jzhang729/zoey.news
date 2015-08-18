import React from 'react'
import Fluxxor from 'fluxxor'
import KeywordList from './keywordlist'
import PublisherList from './publisherlist'
import Slider from './slider'

var BarChart = require("react-chartjs").Bar;
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var options = {
  scaleBeginAtZero : true,
  scaleShowGridLines : true,
  scaleGridLineColor : "rgba(0,0,0,0.3)",
  scaleGridLineWidth : 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  barShowStroke : true,
  barStrokeWidth : 2,
  barValueSpacing : 5,
  barDatasetSpacing : 1,
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
};

export default React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("SnapShotStore")],

  getStateFromFlux: function(){
    return {
      chartdata: this.getFlux().store("SnapShotStore").getSnapShot(this.props.chartParams.chartID),
      keywordlist: this.getFlux().store("SnapShotStore").getKeywords(this.props.chartParams.chartID),
      publisherlist: this.getFlux().store("PublisherStore").getPublishers(),
      activepublisherlist: this.getFlux().store("SnapShotStore").getPublishers(this.props.chartParams.chartID),
      startDate: this.getFlux().store("SnapShotStore").getStartDate(this.props.chartParams.chartID),
      endDate: this.getFlux().store("SnapShotStore").getEndDate(this.props.chartParams.chartID),
      allDates: this.getFlux().store("SnapShotStore").getAllDates(this.props.chartParams.chartID)
    }
  },
  componentDidMount: function() {
    this.getFlux().actions.loadChartData(this.props.chartParams.chartID, this.props.chartParams.keywords, this.props.chartParams.publishers);
  },

  addKeyword: function(keyword){
    this.getFlux().actions.addKeyword(this.props.chartParams.chartID, keyword);
  },
  addPublisher: function(publisher){
    this.getFlux().actions.addPublisher(this.props.chartParams.chartID, publisher);
  },
  render: function() {
    return (
      <div>
      <div className="chart-container">
        <div className="chart-label-y">Keyword Frequency</div>
        <div className="chart-main">
          <BarChart className="chart" data={this.state.chartdata} options={options} redraw />
          <Slider chartID={this.props.chartParams.chartID} dates={this.state.allDates} startDate={this.state.startDate} endDate={this.state.endDate}/>
        </div>
        <i onClick={this.toggleHidden} className="fa fa-2x fa-cog chart-options"></i>
        <div className={(this.state.hiddenSettings ? 'hidden ' : '') + "chart-menu"}>
          <KeywordList chartID={this.props.chartParams.chartID} className={'keyword-list'} list={this.state.keywordlist} />
          <PublisherList chartID={this.props.chartParams.chartID} className={'publisher-list'} list={this.state.publisherlist} activelist={this.state.activepublisherlist}/>
        </div>
      </div>
      </div>
    )
  }
})