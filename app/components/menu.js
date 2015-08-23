import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

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

    var tooltipHome = (
      <Tooltip>Back to the top</Tooltip>
    )

    var tooltipBarChart = (
      <Tooltip>Add bar chart</Tooltip>
    )

    var tooltipLineChart = (
      <Tooltip>Add line chart</Tooltip>
    )

    var tooltipDonut = (
      <Tooltip>Add donut chart</Tooltip>
    )

    return (
      <div className="menu">
        <OverlayTrigger placement='right' overlay={tooltipHome}>
          <div onClick={this.scrollToTop}>
            <i className="fa fa-2x fa-long-arrow-up"></i>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement='right' overlay={tooltipBarChart}>
        <div onClick={this.handleAddChart.bind(this, "barchart")}>
          <i className="fa fa-2x fa-bar-chart"></i>
        </div>
        </OverlayTrigger>
        <OverlayTrigger placement='right' overlay={tooltipLineChart}>
        <div onClick={this.handleAddChart.bind(this, "timelapse")}>
          <i className="fa fa-2x fa-line-chart"></i>
        </div>
        </OverlayTrigger>
        <OverlayTrigger placement='right' overlay={tooltipDonut}>
        <div onClick={this.handleAddChart.bind(this, "donut")} >
          <img src="/img/donut.png"/>
        </div>
        </OverlayTrigger>
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
