import React from 'react'
import Fluxxor from 'fluxxor'
var FluxMixin = Fluxxor.FluxMixin(React)
require("font-awesome-webpack");

export default React.createClass({
  mixins: [FluxMixin],
  handleRemoveKeyword: function(keyword) {
    this.getFlux().actions.removeKeyword(keyword);
  },

  render: function() {
    var keyword = this.props.keyword
    return (
        <li className="keyword-list-item">{keyword} &nbsp;<i className="fa fa-lg fa-times-circle-o" onClick={this.handleRemoveKeyword.bind(this, keyword)}></i></li>
    )
  }
})
