import Fluxxor from 'fluxxor'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.charts = []

    this.bindActions(
      "LOAD_CHARTS", this.load,
      "ADD_CHART", this.addChart
    )
  },

  load: function(charts) {
    this.charts = charts
  },

  getCharts: function() {
    return this.charts
  },

  addChart: function(chart) {
    this.charts.push(chart)
  }
});