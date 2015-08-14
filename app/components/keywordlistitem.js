import React from 'react'
import Fluxxor from 'fluxxor'

export default React.createClass({
  render: function() {
    var keyword = this.props.keyword
    return (
      <li className="keyword-list-item">
        {keyword}
      </li>
    )
  }
})