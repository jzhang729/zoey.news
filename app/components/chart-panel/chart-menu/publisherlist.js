import React from 'react'
import Fluxxor from 'fluxxor'
import PublisherListItem from './publisherlistitem'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  render: function() {

    var ActivePublisherList = this.props.publishers.map(function(publisher, index){
      return (
        <PublisherListItem chartID={this.props.chartID}
                           publishers={this.props.publishers}
                           domain={publisher.domain}
                           index={index}
                           legend={this.props.legend}/>
      )
    }.bind(this))

    return (
      <ul className="publisher-list">
        {ActivePublisherList}
      </ul>
    )
  }
})
