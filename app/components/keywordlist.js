import React from 'react'
import Fluxxor from 'fluxxor'
import KeywordListItem from './keywordlistitem'
import KeywordAdd from './keywordadd'

export default React.createClass({
  render: function() {
    var keywordList = this.props.list.map(function(k, i){
      return (
        <KeywordListItem keyword={k} id={i} />
      )
    }.bind(this))
    return (
      <ul className="keyword-list">
        <h5>Keywords</h5>
        <KeywordAdd />
        {keywordList}
      </ul>
    )
  }
})