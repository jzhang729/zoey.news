import React from 'react'
import Fluxxor from 'fluxxor'
import KeywordList from './keywordlist'
import PublisherList from './publisherlist'
import Slider from './slider'

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

  getInitialState: function() {
    return {
      hiddenSettings: false
    }
  },

  toggleHidden: function() {
    this.setState({
      hiddenSettings: !(this.state.hiddenSettings)
    })
  },

  getStateFromFlux: function(){
    return {
      chartdata: this.getFlux().store("SnapShotStore").getSnapShot(this.props.chartID),
      keywordlist: this.getFlux().store("SnapShotStore").getKeywords(this.props.chartID),
      publisherlist: this.getFlux().store("SnapShotStore").getPublishers(this.props.chartID),
      startDate: this.getFlux().store("SnapShotStore").getStartDate(this.props.chartID),
      endDate: this.getFlux().store("SnapShotStore").getEndDate(this.props.chartID),
      allDates: this.getFlux().store("SnapShotStore").getAllDates(this.props.chartID)
    }
  },
  componentDidMount: function() {
    console.log(this.props.params.publishers)
    this.getFlux().actions.loadChartData(this.props.chartID, this.props.params.keywords, this.props.params.publishers);
  },
  addKeyword: function(keyword){
    this.getFlux().actions.addKeyword(this.props.chartID, keyword);
  },
  addPublisher: function(publisher){
    this.getFlux().actions.addPublisher(this.props.chartID, publisher);
  },
  render: function() {
    return (
      <div>
      <div className="chart-container">
        <div className="chart-label-y">Keyword Frequency</div>
        <div className="chart-main">
          <BarChart className="chart" data={this.state.chartdata} options={options} redraw />
          <div className="chart-label-x">TESTING</div>
          <Slider chartID={this.props.chartID} dates={this.state.allDates} startDate={this.state.startDate} endDate={this.state.endDate}/>
        </div>

        <i onClick={this.toggleHidden} className="fa fa-2x fa-cog chart-menu"></i>
          <PublisherList chartID={this.props.chartID} className={'publisher-list'} list={this.state.publisherlist} />
          <KeywordList chartID={this.props.chartID} className={(this.state.hidden ? 'hidden ' : '') + 'keyword-list'} list={this.state.keywordlist} />

      </div>
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

// <ul>
//         <button onClick={this.addKeyword.bind(this, "terror")}>TERROR</button><br />
//         <button onClick={this.addPublisher.bind(this, 2)}>add National Post</button><br />
//         <button onClick={this.changeStartDate.bind(this, "2015-08-02")}>start is Aug 2</button><br />
//         <button onClick={this.changeEndDate.bind(this, "2015-08-06")}>end is Aug 6</button>
//       </ul>
