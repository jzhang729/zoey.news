import React from 'react'
import Menu from './menu'
import Navbar from './navbar'
import Footer from './footer'
import ChartCanvas from './chartcanvas'
import Fluxxor from 'fluxxor'

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

export default React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("PublisherStore", "SnapShotStore")],

  componentDidMount: function() {
    this.getFlux().actions.loadPublishers();
    this.getFlux().actions.loadCharts();
  },
  getStateFromFlux: function(){
    return {
      publisherList: this.getFlux().store("PublisherStore").getPublishers(),
      charts: this.getFlux().store("SnapShotStore").getCharts(),
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
    var allDates = this.getFlux().store("SnapShotStore").getAllDates()

    return (
      <section className="content">
      <Navbar />
      <Menu ref="menu" />
        <div className="main">
        <ChartCanvas charts={this.state.charts}
                     publisherList = {this.state.publisherList}
                     allDates = {allDates}
        />
        </div>
      <Footer />
      </section>
    )
  }
})

// onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}
