import React from 'react'
import ReactSlider from 'react-slider'

export default React.createClass({
  
  handleDateChange: function() {
    console.log("yo")
  },

  render: function() {
    var slider 
    return (
      <ReactSlider className='horizontal-slider' defaultValue={[0, 100]} withBars onChange={this.handleDateChange} />
    )
  }


})