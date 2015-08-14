import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState: function(){
    return {
      value: ""
    }
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
    this.props.onChange(this.state.value);
  },

  render: function() {
    // var keyword = this.props.keyword
    // var index = this.props.id
    return (
        <input type="text" value={this.state.value} onChange={this.handleChange}></input>
    )
  }
})
