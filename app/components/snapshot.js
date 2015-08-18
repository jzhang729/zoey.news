import React from 'react'
import Fluxxor from 'fluxxor'
import ActiveKeywordList from './activekeywordlist'
import AddKeyword from './addkeyword'
import ActivePublisherList from './activepublisherlist'
import AddPublisher from './addpublisher'
import Slider from './slider'
import { Button } from 'react-bootstrap'

var BarChart = require("react-chartjs").Bar;
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var options = {
  scaleBeginAtZero : true,
  scaleShowGridLines : true,
  scaleGridLineColor : "rgba(0,0,0,0.05)",
  scaleGridLineWidth : 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  barShowStroke : true,
  barStrokeWidth : 2,
  barValueSpacing : 5,
  barDatasetSpacing : 1,
  // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  // legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
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
  render: function() {
    var chart;
    if(this.props.chartParams.snapShot){
      chart = (
        <div className="chart-container">
          <div className="chart-label-y">
            Keyword Frequency
          </div>
          <div className="chart-main">
            <BarChart className="chart"
                      data={this.props.chartParams.snapShot}
                      redraw={true}
                      options={options}/>
            <Slider chartID={this.props.chartParams.chartID} dates={this.props.allDates} startDate={this.props.chartParams.startDate} endDate={this.props.chartParams.endDate}/>
          </div>
          <i onClick={this.toggleHidden} className="fa fa-2x fa-cog chart-options"></i>
          <div className={(this.props.chartParams.hiddenSettings ? 'hidden ' : '') + "chart-menu"}>
            <h5>Keywords</h5>
            <AddKeyword chartID={this.props.chartParams.chartID} className={'keyword-list'} list={this.props.chartParams.keywords} />
            <ActiveKeywordList chartID={this.props.chartParams.chartID} className={'keyword-list'} list={this.props.chartParams.keywords} />
            <h5>Publishers</h5>
            <ActivePublisherList chartID={this.props.chartParams.chartID} className={'publisher-list'} list={this.props.publisherList} activelist={this.props.chartParams.publishers} legend={true} />
            <AddPublisher chartID={this.props.chartParams.chartID} list={this.props.publisherList} activelist={this.props.chartParams.publishers} />
            <Button className="delete" bsStyle="danger">Delete Chart</Button>
          </div>
        </div>
      )
    } else {
      chart = (<h4>loading</h4>)
    }
    return (
      <div>
        {chart}
      </div>
    )
  }
})

// redraw={this.props.chartParams.shouldRedraw}
