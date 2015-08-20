import React from 'react'
import Fluxxor from 'fluxxor'
require("font-awesome-webpack");
import { Input, Button } from 'react-bootstrap'
import Color from '../services/linechartcolor.js'


var FluxMixin = Fluxxor.FluxMixin(React);

export default React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      value: ""
    }
  },

  handleClick: function() {
    if (this.state.value.length > 0) {
      this.getFlux().actions.addKeyword(this.props.chartID, this.state.value)
      this.setState({value: ""})
    }
  },

  handleKeyUp: function(event) {
    if (event.which != 13) {
      this.setState({value: event.target.value})
    } else {
      if (this.state.value.length > 0) {
        this.getFlux().actions.addKeyword(this.props.chartID, this.state.value)
      }
    this.setState({value: ""})
    }
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  render: function() {
    var value = this.state.value
    var ButtonStyle = {
      backgroundColor: '#e7e7e7',
      border: '0px'
    }

    var innerButton = <Button style={ButtonStyle} onClick={this.handleClick}><i className="fa fa-plus-square"></i></Button>;

    return (
        <div>
          <div className="keyword-add">
            <Input type='text' value={value} maxLength="16" chartID={this.props.chartID} buttonBefore={innerButton} onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
          </div>
        </div>
    )
  }
})
