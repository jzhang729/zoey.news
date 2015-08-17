import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'

export default React.createClass({
  render: function() {
    var publisherList = this.props.list.map(function(publisher, index){
      return (
        <PublisherListItem chartID={this.props.chartID} publisher={publisher.domain} publisherIndex={index}/>
      )
    }.bind(this))
    return (
      <ul className="publisher-list">
        {publisherList}
      </ul>
    )
  }
})
