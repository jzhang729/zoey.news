import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'

export default React.createClass({
  render: function() {
    var publisherList = this.props.list.map(function(p, i){
      return (
        <PublisherListItem publisher={p} id={i} />
      )
    }.bind(this))
    return (
      <ul className="publisher-list">
        <li>{publisherList}</li>
      </ul>
    )
  }
})