import React from 'react'
import ReactSlider from 'react-slider'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {
      value: [this.props.startDate, this.props.endDate],
      min: 0,
      max: (this.props.dates.length - 1)
    }
  },

  handleDateChange: function() {
    this.getFlux().actions.changeDateRange(this.props.chartID, this.state.value)
  },

  render: function() {
    var slider 
    return (
      <ReactSlider className='horizontal-slider' min={this.state.min} max={this.state.max} value={this.state.value} withBars onChange={this.handleDateChange} />
    )
  }
})