import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)
require("font-awesome-webpack");

export default React.createClass({
  mixins: [FluxMixin],
  handleRemoveKeyword: function(keywordIndex) {
    this.getFlux().actions.removeKeyword(this.props.chartID, keywordIndex);
  },

  render: function() {
    var keyword = this.props.keyword
    return (
      <li className="keyword-list-item">
        {keyword} &nbsp;
        <i className="fa fa-lg fa-times-circle-o" onClick={this.handleRemoveKeyword.bind(this, keyword)}></i>
      </li>
    )
  }
})
