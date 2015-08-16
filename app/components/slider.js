import React from 'react'
import ReactSlider from 'react-slider'

export default React.createClass({
  
  getInitialState: function() {
    return {
      value: [10,80]
    }
  },

  handleDateChange: function() {
    console.log("hey")
    console.log(this.state.value)
  },

  render: function() {
    var slider 
    return (
      <ReactSlider className='horizontal-slider' value={this.state.value} withBars onChange={this.handleDateChange} />
    )
  }


})