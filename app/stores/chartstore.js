import Fluxxor from 'fluxxor'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.charts = []

    this.bindActions(
      "LOAD_CHARTS", this.load
    )
  },

  load: function(newCharts) {
    this.charts = this.charts.concat(newCharts)
    this.emit("change")
  },

  getCharts: function() {
    return this.charts
  }

});