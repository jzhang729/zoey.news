import React from 'react'
import Fluxxor from 'fluxxor'
import KeywordListItem from './keywordlistitem'

export default React.createClass({
  render: function() {
    var keywordList = this.props.list.map(function(k, i){
      return (
        <KeywordListItem keyword={k} id={i} />
      )
    }.bind(this))
    return (
      <ul className="keyword-list">
        {keywordList}
      </ul>
    )
  }
})