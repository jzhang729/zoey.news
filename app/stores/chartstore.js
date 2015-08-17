import Fluxxor from 'fluxxor'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.charts = []

    this.bindActions(
      "LOAD_CHARTS", this.load
    )
  },

  load: function(charts) {
    this.charts = charts
  },

  getCharts: function() {
    return this.charts
  },
  getChartIDs: function() {
    return this.charts.map(function(chart) {
      return chart.params.chartID
    })
  },
  getKeywords: function() {
    return this.charts.map(function(chart) {
      return chart.params.keywords
    })
  },
  getTitles: function() {
    return this.charts.map(function(chart) {
      return chart.params.title
    })
  },
  getChartTypes: function() {
    return this.charts.map(function(chart) {
      return chart.chartType
    })
  }
});