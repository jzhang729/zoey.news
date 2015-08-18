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

  handleRemoveKeyword: function(keywordIndex) {
    this.getFlux().actions.removeKeyword(this.props.chartID, keywordIndex);
  },

  render: function() {
    var divStyle = [{
      borderBottomColor: Color.Fill[0],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },{
      borderBottomColor: Color.Fill[1],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },{
      borderBottomColor: Color.Fill[2],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    }];
    var keywordList = this.props.list.map(function(keyword, keywordIndex){
      if (this.props.legend == true) {
        return (
          <li className="keyword-list-item" style={divStyle[keywordIndex]}>
            {keyword} &nbsp;
            <i className="fa fa-times-circle-o" chartID={this.props.chartID} onClick={this.handleRemoveKeyword.bind(this, keywordIndex)}></i>
          </li>
        )
      } else {
        return (
          <li className="keyword-list-item">
            {keyword} &nbsp;
            <i className="fa fa-times-circle-o" chartID={this.props.chartID} onClick={this.handleRemoveKeyword.bind(this, keywordIndex)}></i>
          </li>
        )
      }
    }.bind(this))
    return (
      <ul className={this.props.className}>
        <h5>Keywords</h5>
        <div className="keyword-add">
          <input type="text" value={this.state.value} maxLength="16" chartID={this.props.chartID} onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
          <i className="fa fa-2x fa-plus-square" value="Submit" onClick={this.handleClick}></i>
        </div>
        {keywordList}
      </ul>
    )
  }
})
