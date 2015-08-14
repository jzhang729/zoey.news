import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Menu from './menu'
import Navbar from './navbar'
import Footer from './footer'
import ChartCanvas from './chartcanvas'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState: function(){
    return {
      keywordEntry: "",
      charts: [
              {chartType: "snapshot", data: {title: "Homeland Security", keywords: ["ISIS", "Terrorism", "RCMP"], publishers: ["1", "2"], dates: ["2015-08-03", "2015-08-08"]}},
              {chartType: "timelapse", data: {title: "Homeland Security", keywords: ["ISIS", "Terrorism", "RCMP"], publishers: ["1", "2"], dates: ["2015-08-03", "2015-08-08"]}}
      ]
    }
  },
  showMenu: function() {
    this.refs.menu.show();
  },
  render: function() {
    var charts = this.state.charts
    return (
      <section className="content">
      <Navbar />
      <Menu ref="menu" />
      <button onClick={this.showMenu}>Click here to open the menu</button>
        <div className="main">
          <ChartCanvas charts={charts} />
        </div>
      <Footer />
      </section>
    )
  }
})
