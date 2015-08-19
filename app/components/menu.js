import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],
  handleAddChart: function(chartType) {
    this.getFlux().actions.addChart(chartType)
  },
  render: function() {
    return (
      <div className="menu">
        <div>
          <i className="fa fa-2x fa-home"></i>
        </div>
        <div>
          <i className="fa fa-2x fa-bar-chart" onClick={this.handleAddChart.bind(this, "snapshot")}></i>
        </div>
        <div>
          <i className="fa fa-2x fa-line-chart" onClick={this.handleAddChart.bind(this, "timelapse")}></i>
        </div>
        <div>
          <i className="fa fa-2x fa-line-chart" onClick={this.handleAddChart.bind(this, "donut")}></i>
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
