import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({

  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      value: this.props.title
    }
  },

  handleBlur: function(event) {
    this.getFlux().actions.updateChartTitle(this.props.chartID, this.state.value)
  },

  handleKeyUp: function(event) {
    if (event.which != 13) {
      this.setState({value: event.target.innerText})
    } else if (this.state.value.length > 0) {
      this.getFlux().actions.updateChartTitle(this.props.chartID, this.state.value)
    }
  },
  
  render: function() {
    return (
    <span className="chart-title" contentEditable={true} onBlur={this.handleBlur} onKeyUp={this.handleKeyUp}>
      {this.state.value}
    </span>
    )
  }
})
