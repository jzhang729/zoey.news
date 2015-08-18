import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;



export default React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("SnapShotStore", "PublisherStore")],
  
  getStateFromFlux: function(){
    return {
      charts: this.getFlux().store("SnapShotStore").getCharts(),
      // publisherList: this.getFlux().store("PublisherStore").getPublishers(),
      // allDates: this.getFlux().store("SnapShotStore").getAllDates()
      // chartdata: this.getFlux().store("SnapShotStore").getSnapShot(this.props.chartParams.chartID),
      // keywordlist: this.getFlux().store("SnapShotStore").getKeywords(this.props.chartParams.chartID),
      // publisherlist: this.getFlux().store("PublisherStore").getPublishers(),
      // activepublisherlist: this.getFlux().store("SnapShotStore").getPublishers(this.props.chartParams.chartID),
      // startDate: this.getFlux().store("SnapShotStore").getStartDate(this.props.chartParams.chartID),
      // endDate: this.getFlux().store("SnapShotStore").getEndDate(this.props.chartParams.chartID),
      // allDates: this.getFlux().store("SnapShotStore").getAllDates(this.props.chartParams.chartID)
    }
  },
  componentDidMount: function() {
    console.log("canvas mounted")
  },

  render: function() {
    console.log("canvas rendering")
    var charts = this.props.charts.map(function(chart, index) {
      if (chart.chartType == "snapshot") {
        console.log(this.props.charts)
        return (
          <Snapshot chartParams={chart} publisherList={this.props.publisherList} allDates={this.props.allDates}/>
        )
      } else if (chart.chartType == "timelapse") {
        return (
          <Timelapse chartParams={chart} publisherList={this.props.publisherList} allDates={this.props.allDates}/>
        )
      }
    }.bind(this));
    return (
      <div>
        {charts}
      </div>
    )
  }
})
