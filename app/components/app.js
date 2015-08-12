import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'

export default React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello world</h1>
        <Timelapse /><br />
        <Snapshot />
      </div>
    )
  }
})

