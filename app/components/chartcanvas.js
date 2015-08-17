import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'

export default React.createClass({

  render: function() {
    var charts = this.props.charts.map(function(item, index) {
      if (item.chartType == "snapshot") {
        return (
          <Snapshot chartID={item.chartID} />
        )
      } else if (item.chartType == "timelapse") {
        return (
          <Timelapse chartID={item.chartID} />
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
