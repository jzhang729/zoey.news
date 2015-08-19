import React from 'react'
import Fluxxor from 'fluxxor'
import Color from '../services/barchartcolor.js'
import { Input, Button } from 'react-bootstrap'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  handleRemovePublisher: function(publisherIndex) {
    this.getFlux().actions.removePublisher(this.props.chartID, publisherIndex);
  },

  render: function() {
    var publisher = this.props.publisher
    var publisherIndex = this.props.publisherIndex
    var buttonStyle = [{
      backgroundColor: Color.Fill[0],
      borderBottomWidth: '0px'
    },{
      backgroundColor: Color.Fill[1],
      borderBottomWidth: '0px'  
    },{
      backgroundColor: Color.Fill[2],
      borderBottomWidth: '0px'
    },{
      backgroundColor: Color.Fill[3],
      borderBottomWidth: '0px'
    },{
      backgroundColor: Color.Fill[4],
      borderBottomWidth: '0px'
    },{
      backgroundColor: Color.Fill[5],
      borderBottomWidth: '0px'
    },{
      backgroundColor: Color.Fill[6],
      borderBottomWidth: '0px'
    },{
      backgroundColor: Color.Fill[7],
      borderBottomWidth: '0px'
    }];

    var iStyle = {
      color: 'rgba(255,255,255,1)'
    }

    var innerButton = <Button style={buttonStyle[this.props.publisherIndex]}><i style={iStyle} className="fa fa-times" onClick={this.handleRemovePublisher.bind(this, publisherIndex)}></i></Button>;

    var listItem;
    if (this.props.legend == true) {
      listItem = (
        <div className="publisher-list-item">
          <Input type='text' buttonBefore={innerButton} value={publisher} />
        </div>
      )
    } else {
      listItem = (
        <div className="publisher-list-item">
          <Input type='text' buttonBefore={innerButton} value={publisher} />
        </div>
      )
    }
    return (
      <li>
        {listItem}
      </li>
    )
  }
})
