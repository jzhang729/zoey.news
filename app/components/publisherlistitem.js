import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  handleRemovePublisher: function(publisherIndex) {
    this.getFlux().actions.removePublisher(this.props.chartID, publisherIndex);
  },

  render: function() {
    var publisher = this.props.publisher
    var publisherIndex = this.props.publisherIndex
    return (
      <li className="publisher-list-item">
        {publisher} &nbsp;
        <a onClick={this.handleRemovePublisher.bind(this, publisherIndex)}>Remove</a>
      </li>
    )
  }
})
