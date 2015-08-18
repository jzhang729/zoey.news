import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");
import Color from '../services/linechartcolor.js'


var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  handleRemoveKeyword: function(keywordIndex) {
    this.getFlux().actions.removeKeyword(this.props.chartID, keywordIndex);
  },

  render: function() {
    var divStyle = [{
      borderBottomColor: Color.Fill[0],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },

    {
      borderBottomColor: Color.Fill[1],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },

    {
      borderBottomColor: Color.Fill[2],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    }];

    var activeKeywordList = this.props.list.map(function(keyword, keywordIndex){
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
      <div>
        <ul className={'keyword-list'}>
          {activeKeywordList}
        </ul>
      </div>
    )
  }
})
