import React from 'react'
import Timelapse from './timelapse'
import Snapshot from './snapshot'
import Menu from './menu'
import Navbar from './navbar'
import Footer from './footer'
import ChartCanvas from './chartcanvas'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

export default React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PublisherStore", "ChartStore")],

  getInitialState: function(){
  },
  componentDidMount: function() {
    this.getFlux().actions.loadPublishers();
    this.getFlux().actions.loadCharts();
  },  
  getStateFromFlux: function(){
    return {
      charts: this.getFlux().store("ChartStore").getCharts(),
      publishers: this.getFlux().store("PublisherStore").getPublishers()
    }
  },
  showMenu: function() {
    this.refs.menu.show();
  },
  hideMenu: function() {
    this.refs.menu.hide();
  },
  handleAddChart: function(chartType) {
    this.getFlux().actions.addChart(chartType)
  },
  render: function() {
    return (
      <section className="content">
      <Navbar />
      <Menu ref="menu" />
        <div className="main">
        <a href="#" onClick={this.handleAddChart.bind(this, "snapshot")}>Add Snapshot</a>
        <a href="#" onClick={this.handleAddChart.bind(this, "timelapse")}>Add TimeLapse</a>
        <ChartCanvas charts={this.state.charts} />
        </div>
      <Footer />
      </section>
    )
  }
})

// onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}