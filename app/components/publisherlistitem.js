import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  handleRemovePublisher: function(i) {
    this.getFlux().actions.removePublisher(i);
  },

  render: function() {
    var publisher = this.props.publisher
    var index = this.props.id
    return (
      <li className="publisher-list-item">
        {publisher} | <a onClick={this.handleRemovePublisher.bind(this, index)}>Remove</a>
      </li>
    )
  }
})