import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'

export default React.createClass({

  render: function() {
    var charts = this.props.charts.map(function(chart, index) {
      if (chart.chartType == "snapshot") {
        return (
          <Snapshot chartParams={chart} />
        )
      } else if (chart.chartType == "timelapse") {
        return (
          <Timelapse chartParams={chart} />
        )
      }
    });
    return (
      <div>
        {charts}
      </div>
    )
  }
})
