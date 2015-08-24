import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'
import { DropDownButton, MenuItem } from 'react-bootstrap'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({

  mixins: [FluxMixin],

  handleChange: function(event) {
    this.props.addPublisher(event)
  },

  render: function() {

    var activePublisherIDs = this.props.publishers.map(function(publisher) {
      return publisher.id
    })

    var inactivePublishers = this.props.publisherList.filter(function(publisher) {
      return activePublisherIDs.indexOf(publisher.id) < 0
    });

    var inactivePublisherHTML = inactivePublishers.map(function(publisher, index){
      return (
        <option eventKey={index} chartID={this.props.chartID} value={publisher.id}>{publisher.domain}</option>
      )
    }.bind(this));

    return (
      <div className="publisher-add">
        <select onChange={this.handleChange} value="0">
        <option value="0">Add media source</option>
          {inactivePublisherHTML}
        </select>
      </div>
    )
  }
})
