import React from 'react'
import Fluxxor from 'fluxxor'
import Button from './button'
import InputText from './inputtext'

var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],
  // handleRemoveKeyword: function(i) {
  //   this.getFlux().actions.removeKeyword(i);
  // },

  // handleSubmit: function() {
  //   console.log("submitted")
  // },

  handleClick: function() {
    this.getFlux().actions.addKeyword(this.props.chartID, this.state.value)                           
  },

  getInitialState: function(){
    return {
      value: ""
    }
  },
  
  handleChange: function() {
    this.setState({value: event.target.value});
  },

  render: function() {
    return (
      <div className="keyword-add">
        <InputText onChange={this.handleChange}/>
        <Button value="Submit" onClick={this.handleClick}/>
      </div>
    )
  }
})
