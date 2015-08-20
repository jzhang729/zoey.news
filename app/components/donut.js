import React from 'react'
import Fluxxor from 'fluxxor'
import ActiveKeywordList from './activekeywordlist'
import AddKeyword from './addkeyword'
import ActivePublisherList from './activepublisherlist'
import AddPublisher from './addpublisher'
import Slider from './slider'
import ChartTitle from './charttitle'
import { Button } from 'react-bootstrap'

var DonutChart = require("react-chartjs").Doughnut;
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

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
    this.getFlux().actions.loadChartData(this.props.chartParams.chartID);
  },
  addKeyword: function(keyword){
    this.getFlux().actions.addKeyword(this.props.chartParams.chartID, keyword);
  },
  addPublisher: function(publisher){
    this.getFlux().actions.addPublisher(this.props.chartParams.chartID, publisher);
  },
  handleDeleteChart: function() {
    this.getFlux().actions.deleteChart(this.props.chartParams.chartID);
  },

  render: function() {
    var chart;
    var deleteChartButton = "";

    if (this.props.chartListLength > 1) {
      deleteChartButton = (
        <Button onClick={this.handleDeleteChart} className="delete" bsStyle="danger">Delete Chart</Button>
      )
    }

    if(this.props.chartParams.snapShot){
      chart = (
        <div className="chart-container">
          <div className="chart-label-y">
          </div>
          <div className="chart-main">
          <ChartTitle title={this.props.chartParams.title} chartID={this.props.chartParams.chartID} />
            <DonutChart className="chart"
                      data={this.props.chartParams.snapShot}
                      redraw={true}
                      options={options}/>
            <Slider chartID={this.props.chartParams.chartID} dates={this.props.allDates} startDate={this.props.chartParams.startDate} endDate={this.props.chartParams.endDate}/>
          </div>
          <div className="chart-menu">
            <h5>Keywords</h5>
            <AddKeyword chartID={this.props.chartParams.chartID} className={'keyword-list'} list={this.props.chartParams.keywords} />
            <ActiveKeywordList chartID={this.props.chartParams.chartID} className={'keyword-list'} list={this.props.chartParams.keywords} legend={true} />
            <h5>Publishers</h5>
              <ActivePublisherList chartID={this.props.chartParams.chartID}
                                   className={'publisher-list'}
                                   list={this.props.publisherList}
                                   activelist={this.props.chartParams.publishers}/>
              <AddPublisher chartID={this.props.chartParams.chartID} list={this.props.publisherList} activelist={this.props.chartParams.publishers} />
              {deleteChartButton}
          </div>
        </div>
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

// <ActivePublisherList chartID={this.props.chartParams.chartID} className={'publisher-list'} list={this.props.publisherList} activelist={this.props.chartParams.publishers} />

// redraw={this.props.chartParams.shouldRedraw}
// // <Slider chartID={this.props.chartParams.chartID} dates={this.props.allDates} startDate={this.props.chartParams.startDate} endDate={this.props.chartParams.endDate}/>
