import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  // handleRemoveKeyword: function(i) {
  //   this.getFlux().actions.removeKeyword(i);
  // },

  handleClick: function() {
    this.props.onClick()
  },

  render: function() {
    // var keyword = this.props.keyword
    // var index = this.props.id
    return (
      <input type="button" value="search" onClick={this.handleClick}></input>
    )
  }
})
