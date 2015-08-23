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
        <SliderLegend allDates={this.props.allDates} />
        <ReactSlider className='horizontal-slider'
                     min={0}
                     max={this.props.allDates.length - 1}
                     value={this.state.value}
                     withBars
                     onAfterChange={this.handleDateChange}
        />
      </div>
    )
  }
})
