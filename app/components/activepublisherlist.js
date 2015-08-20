import React from 'react'
import Fluxxor from 'fluxxor'
import ActivePublisherListItem from './activepublisherlistitem'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  render: function() {

    var activePublisherList = this.props.activelist.map(function(publisher, index){
      return (
        <ActivePublisherListItem chartID={this.props.chartID} activePublishers={this.props.activelist} publisher={publisher.domain} publisherIndex={index} legend={this.props.legend}/>
      )
    }.bind(this))

    return (
      <ul className="publisher-list">
        {activePublisherList}
      </ul>
    )
  }
})
