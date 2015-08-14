import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {
      visible: false
    }; 
  },
  show: function() {
    this.setState({ visible: true });
    document.addEventListener("click", this.hide.bind(this));
  },
  hide: function() {
    document.removeEventListener("click", this.hide.bind(this));
    this.setState({ visible: false });
  },
  render: function() {
    return (
      <div className={(this.state.visible ? "visible " : "" ) + "menu"}>
        <div>
          Link
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