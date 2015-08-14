import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  handleRemoveKeyword: function(i) {
    this.getFlux().actions.removeKeyword(i);
  },

  render: function() {
    var keyword = this.props.keyword
    var index = this.props.id
    return (
      <li className="keyword-list-item">
        {keyword} | <a onClick={this.handleRemoveKeyword.bind(this, index)}>Remove</a>
      </li>
    )
  }
})