import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'

export default React.createClass({

  render: function() {
    var charts = this.props.charts.map(function(chart, index) {
      if (chart.chartType == "snapshot") {
        return (
          <Snapshot chartID={chart.chartID} params={chart.params} />
        )
      } else if (chart.chartType == "timelapse") {
        return (
          <Timelapse chartID={chart.chartID} params={chart.params} />
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
