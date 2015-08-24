import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  handleRemovePublisher: function(publisherIndex) {
    this.props.removePublisher(publisherIndex)
  },

  render: function() {

    var ActivePublisherList = this.props.publishers.map(function(publisher, index){
      return (
        <PublisherListItem chartID={this.props.chartID}
                           chartType={this.props.chartType}
                           publishers={this.props.publishers}
                           domain={publisher.domain}
                           index={index}
                           removePublisher={this.handleRemovePublisher}
        />
      )
    }.bind(this))

    return (
      <ul className="publisher-list">
        {ActivePublisherList}
      </ul>
    )
  }
})
