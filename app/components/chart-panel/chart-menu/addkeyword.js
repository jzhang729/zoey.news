import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");
import { Input, Button } from 'react-bootstrap'
import Color from '../../../services/linechartcolor.js'


var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({

  mixins: [FluxMixin],

  handleChange: function(event) {
    this.props.onChange(event.target.value);
  },

  handleClick: function() {
    this.props.addKeyword()
  },

  handleKeyUp: function(event) {
    if (event.which == 13) {
      this.props.addKeyword()
    }
  },

  render: function() {
    var ButtonStyle = {
      backgroundColor: '#e7e7e7',
      fontSize: '12pt',
      fontWeight: 'bold'
    }

    var addKeywordDisabled = false;
    if (this.props.keywords.length > 7) {
      addKeywordDisabled = true;
    }

    var innerButton = <Button style={ButtonStyle} onClick={this.handleClick}>+</Button>;

    return (
        <div>
          <div className="keyword-add">
            <Input type='text'
                   value={this.props.newKeyword}
                   disabled={addKeywordDisabled}
                   maxLength="16"
                   buttonBefore={innerButton}
                   onChange={this.handleChange}
                   onKeyUp={this.handleKeyUp} />
          </div>
        </div>
    )
  }
})
