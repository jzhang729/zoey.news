import React from 'react'
import Fluxxor from 'fluxxor'
import Color from '../../../services/barchartcolor.js'
import { Input, Button } from 'react-bootstrap'
var FluxMixin = Fluxxor.FluxMixin(React)

export default React.createClass({
  mixins: [FluxMixin],

  handleRemovePublisher: function(publisherIndex) {
    if (this.props.publishers.length > 1) {
      this.getFlux().actions.removePublisher(this.props.chartID, publisherIndex);
    }
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

    var innerButtonLegend = <Button style={legendButtonStyle[this.props.index]}
                                    onClick={this.handleRemovePublisher.bind(this, this.props.index)}>
                                    <i style={iStyle} className="fa fa-times"></i></Button>;
    var innerButtonNormal = <Button style={normalButtonStyle}
                                    onClick={this.handleRemovePublisher.bind(this, this.props.index)}>
                                    <i style={iStyle} className="fa fa-times"></i></Button>;

    var listItem;

    if (this.props.legend == true) {
      listItem = (
        <div className="publisher-list-item">
          <Input type='text' disabled buttonBefore={innerButtonLegend} value={this.props.domain} />
        </div>
      )
    } else {
      listItem = (
        <div className="publisher-list-item">
          <Input type='text' disabled buttonBefore={innerButtonNormal} value={this.props.domain} />
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
