import React from 'react'

export default React.createClass({
  render: function() {
    
    var increment = Math.floor((this.props.dates.length)/5)
    var dateLabels = this.props.dates.map(function(date, index) {
      var dateString = ""
      if (((index+1) % increment == 0) || (index == 0) || ((index+1) == this.props.dates.length)) {
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