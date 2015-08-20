import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],
  handleAddChart: function(chartType) {
    this.getFlux().actions.addChart(chartType);
  },
  scrollToTop: function() {
    window.scroll(0,0);
  },
  render: function() {
    return (
      <div className="menu">
        <div onClick={this.scrollToTop.bind(this)}>
          <i className="fa fa-2x fa-long-arrow-up"></i>
        </div>
        <div onClick={this.handleAddChart.bind(this, "snapshot")}>
          <i className="fa fa-2x fa-bar-chart"></i>
        </div>
        <div onClick={this.handleAddChart.bind(this, "timelapse")}>
          <i className="fa fa-2x fa-line-chart"></i>
        </div>
        <div onClick={this.handleAddChart.bind(this, "donut")} >
          <img src="/img/donut.png"/>
        </div>
      </div>
    )
  }
})

  // show: function() {
  //   this.setState({ visible: true });
  //   document.addEventListener("click", this.hide.bind(this));
  // },
  // hide: function() {
  //   document.removeEventListener("click", this.hide.bind(this));
  //   this.setState({ visible: false });
  // },
