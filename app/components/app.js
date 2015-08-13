import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Leftbar from './leftbar'
import Navbar from './navbar'
import Footer from './footer'
import Timeslider from './timeslider'

export default React.createClass({
  render: function() {
    return (
      <section className="content">
      <Navbar />
        <Leftbar />
        <div className="main">  
          <Timelapse />
          <Snapshot />
        </div>
      <Footer />
      </section>
    )
  }
})

