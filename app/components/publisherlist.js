import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  handleChange: function(event) {
    this.getFlux().actions.addPublisher(this.props.chartID, event.target.value)
  },

  render: function() {

    var activePublisherList = this.props.activelist.map(function(publisher, index){
      return (
        <PublisherListItem chartID={this.props.chartID} publisher={publisher.domain} publisherIndex={index}/>
      )
    }.bind(this))

    var activePubIDs = this.props.activelist.map(function(publisher) {
      return publisher.id
    })

    var inactivePubs = this.props.list.filter(function(pub) {
      return activePubIDs.indexOf(pub.id) < 0
    });

    var publisherList = inactivePubs.map(function(publisher){
      return (
        <option chartID={this.props.chartID} value={publisher.id}>{publisher.domain}</option>
      )
    }.bind(this))

    return (
      <ul className={this.props.className}>
        <h5>Publishers</h5>
        {activePublisherList}
        <div className="publisher-add">
          <select onChange={this.handleChange}>
            <option value="">Add media source</option>
            {publisherList}
          </select>
        </div>
      </ul>
    )
  }
})
