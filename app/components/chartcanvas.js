import React from 'react'
import Timelapse from './timelapse'
import Donut from './donut'
import Snapshot from './snapshot'
import Fluxxor from 'fluxxor'

export default React.createClass({

  render: function() {
    var charts = this.props.charts.map(function(chart, index) {
      if (chart.chartType == "snapshot") {
        return (
          <Snapshot chartParams={chart} publisherList={this.props.publisherList} allDates={this.props.allDates}/>
        )
      } else if (chart.chartType == "timelapse") {
        return (
          <Timelapse chartParams={chart} publisherList={this.props.publisherList} allDates={this.props.allDates}/>
        )
      } else if (chart.chartType == "donut") {
        return (
          <Donut chartParams={chart} publisherList={this.props.publisherList} allDates={this.props.allDates} />
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
