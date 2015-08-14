import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'

export default React.createClass({

  render: function() {
    var charts = this.props.charts.map(function(item, index) {
      if (item.chartType == "snapshot") {
        return (
          <Snapshot data={item.data} />
        )
      } else if (item.chartType == "timelapse") {
        return (
          <Timelapse data={item.data} />
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
