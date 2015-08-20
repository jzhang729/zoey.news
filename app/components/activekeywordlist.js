import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack")
import { Input, Button } from 'react-bootstrap'
import Color from '../services/barchartcolor.js'

var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  handleRemoveKeyword: function(keywordIndex) {
    this.getFlux().actions.removeKeyword(this.props.chartID, keywordIndex);
  },

  render: function() {

    var legendButtonStyle = []

    for (var i = 0; i < 8; i++) {
      legendButtonStyle.push(
      {
      backgroundColor: Color.Fill[i],
      borderBottomWidth: '0px'
      })
    }

    var normalButtonStyle = {
      backgroundColor: 'rgba(0,0,0,0.5)'
    }

    var iStyle = {
      color: 'rgba(255,255,255,1)'
    }


    var activeKeywordList = this.props.list.map(function(keyword, keywordIndex){
      var innerButtonLegend = <Button style={legendButtonStyle[keywordIndex]} onClick={this.handleRemoveKeyword.bind(this, keywordIndex)}><i style={iStyle} className="fa fa-times"></i></Button>;
      var innerButtonNormal = <Button style={normalButtonStyle} onClick={this.handleRemoveKeyword.bind(this, keywordIndex)}><i style={iStyle} className="fa fa-times"></i></Button>;

      if (this.props.legend == true) {
        return (
          <li className="keyword-list-item">
            <Input type='text' chartID={this.props.chartID} buttonBefore={innerButtonLegend} value={keyword.trim()} />
          </li>
        )
      } else {
        return (
          <li className="keyword-list-item">
            <Input type='text' chartID={this.props.chartID} buttonBefore={innerButtonNormal} value={keyword.trim()} />
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
