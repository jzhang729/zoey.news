import React from 'react'
import TimeSlider from 'react-time-slider'

export default React.createClass({
  render: function() {
    var timeSlider = TimeSlider({
      minFrom: 201402,
      maxTo: 201411,
      initialFrom: 201404,
      initialTo: 201408,
      onChange: function(values) {
        console.log(values)
      }
    });
    return timeSlider;
  }
});