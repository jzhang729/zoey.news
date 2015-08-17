import React from 'react'
import Fluxxor from 'fluxxor'
import KeywordListItem from './keywordlistitem'
import KeywordAdd from './keywordadd'

export default React.createClass({
  getInitialState: function() {
    return {
      hidden: false
    }
  },

  show: function() {
    this.setState({ visible: true });
    document.addEventListener("hover", this.hide.bind(this));
  },

  hide: function() {
    document.removeEventListener("hover", this.hide.bind(this));
    this.setState({ visible: false });
  },

  render: function() {
    var keywordList = this.props.list.map(function(keyword, keywordIndex){
      return (
        <KeywordListItem chartID={this.props.chartID} keyword={keyword} id={keywordIndex} />
      )
    }.bind(this))
    return (
      <ul className={this.props.className}>
        <h5>Keywords</h5>
        <KeywordAdd chartID={this.props.chartID} />
        {keywordList}
      </ul>
    )
  }
})
