import React from 'react'
import Fluxxor from 'fluxxor'
import ActivePublisherListItem from './activepublisherlistitem'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({

  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      value: ""
    }
  },

  handleChange: function(event) {
    if (event.target.value > 0) {
      this.getFlux().actions.addPublisher(this.props.chartID, event.target.value)
    }
  },

  render: function() {

    var activePubIDs = this.props.activelist.map(function(publisher) {
      return publisher.id
    })

    var inactivePubs = this.props.list.filter(function(pub) {
      return activePubIDs.indexOf(pub.id) < 0
    });

    var inactivePublisherList = inactivePubs.map(function(publisher){
      return (
        <option chartID={this.props.chartID} value={publisher.id}>{publisher.domain}</option>
      )
    }.bind(this));

    return (

      <div className="publisher-add">
        <select onChange={this.handleChange} value="0">
          <option value="0">Add media source</option>
          {inactivePublisherList}
        </select>
      </div>

    )
  }
})
