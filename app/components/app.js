import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Navbar from './navbar'

export default React.createClass({
  render: function() {
    return (
      <section className="content">
        
        <Navbar /><br />
        <div className="visual">  
          <Timelapse /><br />
          <Snapshot />
        </div>
      </section>
    )
  }
})

