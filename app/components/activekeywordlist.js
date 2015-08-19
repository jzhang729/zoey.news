import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack")
import { Input, Button } from 'react-bootstrap'
import Color from '../services/donutchartcolor.js'


var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  handleRemoveKeyword: function(keywordIndex) {
    this.getFlux().actions.removeKeyword(this.props.chartID, keywordIndex);
  },

  render: function() {
    var keyword = this.props.keyword
    var keywordIndex = this.props.keywordIndex

    var buttonStyle = [{
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
    },

    {
      borderBottomColor: Color.Fill[3],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },

    {
      borderBottomColor: Color.Fill[4],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },

    {
      borderBottomColor: Color.Fill[5],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },

    {
      borderBottomColor: Color.Fill[6],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    },

    {
      borderBottomColor: Color.Fill[7],
      borderBottomWidth: '8px',
      borderBottomStyle: 'solid'
    }];

    var iStyle = {
      color: 'rgba(255,255,255,1)'
    }

    var innerButton = <Button style={buttonStyle[this.props.keywordIndex]}><i style={iStyle} className="fa fa-times" onClick={this.handleRemoveKeyword.bind(this, keywordIndex)}></i></Button>;

    var activeKeywordList = this.props.list.map(function(keyword, keywordIndex){
      if (this.props.legend == true) {
        return (
          <li className="keyword-list-item">
            <Input type='text' chartID={this.props.chartID} buttonBefore={innerButton} value={keyword} />
          </li>
        )
      } else {
        return (
          <li className="keyword-list-item">
            <Input type='text' chartID={this.props.chartID} buttonBefore={innerButton} value={keyword} />
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
