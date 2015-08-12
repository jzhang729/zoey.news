import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Navbar from './navbar'

export default React.createClass({
  render: function() {
    return (
      <div className="">
        <Navbar />
        <Timelapse /><br />
        <Snapshot />
      </div>
    )
  }
})

