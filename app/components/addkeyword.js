import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");
import Color from '../services/linechartcolor.js'


var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      hidden: false,
      value: ""
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

  handleClick: function() {
    this.getFlux().actions.addKeyword(this.props.chartID, this.state.value)
    this.setState({value: ""})
  },

  handleKeyDown: function(event) {
    if (event.which == 13) {
      this.getFlux().actions.addKeyword(this.props.chartID, event.target.value)
      this.setState({value: ""})
    }
  },

  handleChange: function(event) {
    this.setState({value: event.target.value})
  },

  render: function() {

    return (
        <div>
          <div className="keyword-add">
            <input type="text" value={this.state.value} maxLength="16" chartID={this.props.chartID} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder="Add keyword"></input>
            <i className="fa fa-2x fa-plus-square" value="Submit" onClick={this.handleClick}></i>
          </div>
        </div>
    )
  }
})
