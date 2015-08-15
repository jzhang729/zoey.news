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
          <i className="fa fa-3x fa-home"></i>
        </div>
        <div>
          Link
        </div>
        <div>
          Link
        </div>
        <div>
          Link
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