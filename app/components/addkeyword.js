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

    var ButtonStyle = {
      backgroundColor: '#e7e7e7',
      border: '0px'
    }

    var innerButton = <Button style={ButtonStyle} onClick={this.handleChange}><i className="fa fa-plus-square"></i></Button>;

    return (
        <div>
          <div className="keyword-add">
            <Input type='text' maxLength="16" chartID={this.props.chartID} buttonBefore={innerButton} onKeyDown={this.handleKeyDown} />
          </div>
        </div>
    )
  }
})
