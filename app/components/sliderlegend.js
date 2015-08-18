import React from 'react'

export default React.createClass({

  getInitialState: function() {
    return {
      dates: this.props.dates
    }
  },
  render: function() {
    
    var increment = Math.floor((this.state.dates.length)/5)
    var dateLabels = this.state.dates.map(function(date, index) {
      var dateString = ""
      if (((index+1) % increment == 0) || (index == 0) || ((index+1) == this.state.dates.length)) {
      var formatDate = new Date(date);
      var day = formatDate.getDate();
      var month = formatDate.getMonth() + 1
      dateString = month.toString() + "/" + day.toString()
      }
      return (
        <div className="date-slider-label">{dateString}</div>
      )
    }.bind(this))
    return (
      <div className = "chart-label-x">
        {dateLabels}
      </div>
    )
  }
})