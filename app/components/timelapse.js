import React from 'react'
import Fluxxor from 'fluxxor'
import ActiveKeywordList from './activekeywordlist'
import AddKeyword from './addkeyword'
import ActivePublisherList from './activepublisherlist'
import AddPublisher from './addpublisher'

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
  mixins: [FluxMixin],
  componentDidMount: function() {
    this.getFlux().actions.loadChartData(this.props.chartParams.chartID);
  },
  render: function() {
    var chart;
    if(this.props.chartParams.snapShot){
      chart = (
        <div className="chart-container">
          <div className="chart-label-y">Keyword Frequency</div>
          <div className="chart-main">
          <div className="add">
            <AddPublisher chartID={this.props.chartParams.chartID} list={this.props.publisherList} activelist={this.props.chartParams.publishers} />     
            <AddKeyword chartID={this.props.chartParams.chartID} className={'keyword-list'} list={this.props.chartParams.keywords} />
          </div>
          <ActivePublisherList chartID={this.props.chartParams.chartID} className={'publisher-list'} list={this.props.publisherList} activelist={this.props.chartParams.publishers}/>
          <ActiveKeywordList chartID={this.props.chartParams.chartID}
                               className={'keyword-list'}
                               list={this.props.chartParams.keywords}
                               legend={true} />
          <LineChart className="chart"
                     data={this.props.chartParams.snapShot}
                     redraw={true}
                     options={options} />
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

// <i onClick={this.toggleHidden} className="fa fa-2x fa-cog chart-options"></i>        

// Experimenting with this code to control whether to redraw entire chart
// redraw={this.props.chartParams.shouldRedraw}
