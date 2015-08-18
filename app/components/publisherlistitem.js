import React from 'react'
import Fluxxor from 'fluxxor'
import Color from '../services/barchartcolor.js'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  handleRemovePublisher: function(publisherIndex) {
    this.getFlux().actions.removePublisher(this.props.chartID, publisherIndex);
  },

  render: function() {
    var publisher = this.props.publisher
    var publisherIndex = this.props.publisherIndex
    var divStyle = [{
      borderBottomColor: Color.Fill[0],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },{
      borderBottomColor: Color.Fill[1],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },{
      borderBottomColor: Color.Fill[2],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    }];
    return (
      <li className="publisher-list-item" style={divStyle[this.props.publisherIndex]}>
        {publisher} &nbsp;
        <i className="fa fa-times" onClick={this.handleRemovePublisher.bind(this, publisherIndex)}></i>
      </li>
    )
  }
})