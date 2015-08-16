import React from 'react'
require("font-awesome-webpack");

export default React.createClass({
  getInitialState: function() {
    return {
      visible: true
    }; 
  },
  show: function() {
    this.setState({ visible: true });
    document.addEventListener("hover", this.hide.bind(this));
  },
  hide: function() {
    document.removeEventListener("hover", this.hide.bind(this));
    this.setState({ visible: false });
  },
  render: function() {
    return (
      <div className={(this.state.visible ? "visible " : "" ) + "menu"}>
        <div>
          <i className="fa fa-2x fa-bars"></i>
        </div>
        <div>
          <i className="fa fa-2x fa-home"></i>
        </div>
        <div>
          <i className="fa fa-2x fa-cog"></i>
        </div>
        <div>
          <i className="fa fa-2x fa-sign-in"></i>
        </div>
        <div>
          <i className="fa fa-2x fa-bar-chart"></i>
        </div>
        <div>
          <i className="fa fa-2x fa-line-chart"></i>
        </div>
      </div>
    )
  } 
})


  // show: function() {
  //   this.setState({ visible: true });
  //   document.addEventListener("click", this.hide.bind(this));
  // },
  // hide: function() {
  //   document.removeEventListener("click", this.hide.bind(this));
  //   this.setState({ visible: false });
  // },