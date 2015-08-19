import React from 'react'
import ReactSlider from 'react-slider'
import SliderLegend from './sliderlegend'

import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {
      value: [this.props.startDate, this.props.endDate],
      min: 0,
      max: (this.props.dates.length - 1),
    }
  },

  handleDateChange: function() {
    this.getFlux().actions.changeDateRange(this.props.chartID, this.state.value)
  },
  handleSliderClick: function() {

  },

  render: function() {
    var slider 
    return (
      <div>
        <SliderLegend dates={this.props.dates} />
        <ReactSlider pearling={true} className='horizontal-slider' min={this.state.min} max={this.state.max} value={this.state.value} withBars onAfterChange={this.handleDateChange} />
      </div>
    )
  }
})