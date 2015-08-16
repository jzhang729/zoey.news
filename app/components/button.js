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
      <i className="fa fa-2x fa-plus-square" onClick={this.handleClick}></i>
    )
  }
})
