import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'
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
  },

  handleClick: function() {
    var publisherList = this.props.list
    var activePublisherListIDs = this.props.activelist.map(function(publisher) {
      return publisher.id.toString()
    })
    if (activePublisherListIDs.indexOf(this.state.value) < 0) {
      this.getFlux().actions.addPublisher(this.props.chartID, this.state.value)
    }
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

    var publisherList = this.props.list.map(function(publisher){
      return (
        <option chartID={this.props.chartID} value={publisher.id}>{publisher.domain}</option>
      )
    }.bind(this))

    return (
      <ul className={this.props.className}>
        <h5>Publishers</h5>
        {activePublisherList}
        <div className="publisher-add">
          <select onChange={this.handleChange} value={this.state.value}>
            <option value="">Add media source</option>
            {publisherList}
          </select>
          <button value="Submit" onClick={this.handleClick}>Submit</button>
        </div>
      </ul>
    )
  }
})
