import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Leftbar from './leftbar'
import Navbar from './navbar'
import Footer from './footer'
import ChartCanvas from './chartcanvas'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState: function(){
    return {
      charts: [
              {chartType: "snapshot", data: {title: "Homeland Security", keywords: ["ISIS", "Terrorism", "RCMP"], publishers: ["1", "2"], dates: ["2015-08-03", "2015-08-08"]}},
              {chartType: "timelapse", data: {title: "Homeland Security", keywords: ["ISIS", "Terrorism", "RCMP"], publishers: ["1", "2"], dates: ["2015-08-03", "2015-08-08"]}}
      ]
    }
  },

  render: function() {
    var charts = this.state.charts
    return (
      <section className="content">
      <Navbar />
        <Leftbar />
        <div className="main">  
          <ChartCanvas charts={charts} />
        </div>
      <Footer />
      </section>
    )
  }
})

