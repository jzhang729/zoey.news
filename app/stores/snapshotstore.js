import Fluxxor from 'fluxxor'
import color from '../services/color'
import makeDates from '../services/makeDates'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.charts = []
    this.dates = makeDates()

    // var chart = {
    //   chartID:
    //   chartType:
    //   keywords: []
    //   publishers: [{},{}]
    //   datastore: []
    //   snapShot: []
    // }

    this.bindActions(
      "LOAD_CHART_DATA", this.loadChartData,
      "UPDATE_CHART", this.update,
      "ADD_KEYWORD", this.handleAddKeyword,
      "REMOVE_KEYWORD", this.handleRemoveKeyword,
      "ADD_PUBLISHER", this.handleAddPublisher,
      "REMOVE_PUBLISHER", this.handleRemovePublisher,
      "CHANGE_DATE_RANGE", this.handleChangeDateRange,
      "LOAD_CHARTS", this.handleLoadCharts
    );
  },
  _byChartID: function(id) {
    var found = {}
    this.charts.forEach(function(chart) {
      if (chart.chartID == id) {
        found = chart
      }
    })
    return found
  },
  handleLoadCharts: function(newCharts) {
    newCharts = newCharts.map(function(chart) {
      chart.startDate = 0
      chart.endDate = (this.dates.length -1)
      chart.datastore = []
      chart.snapShot = {
        labels: [],
        datasets: [{
          label: "",
          data: []
        }]
      }
      return chart
    }.bind(this))
    this.charts = this.charts.concat(newCharts)
  },
  loadChartData: function(payload, type){
    var id = payload.id
    var data = payload.data
    this._byChartID(id).datastore = data
  },
  update: function(chartID){
    var currentChart = this._byChartID(chartID)

    var dateMatch = function (row) {
      var date = new Date(row.date);
      var startDate = new Date(this.dates[currentChart.startDate])
      var endDate = new Date(this.dates[currentChart.endDate])
      return ((date >= startDate) && (date <= endDate))
    }.bind(this)

    var filteredArr = currentChart.datastore.filter(dateMatch);
    var newDatasets = []
    currentChart.publishers.forEach(function(publisher, index) {
      var wordcount = currentChart.keywords.map(function(keyword) {
        var sum = 0
        filteredArr.forEach(function(row) {
          if ( (publisher.id == row.publisher_id) && (keyword == row.word) ) {
            sum += row.nentry
          }
        })
        return sum
      })
      var dataset = {
        label: publisher.domain,
        data: wordcount,
        fillColor: color.Fill[index],
        strokeColor: color.Stroke[index],
        highlightFill: color.HighlightFill[index],
        highlightStroke: color.HighlightStroke[index]
      }
      newDatasets.push(dataset)
    }.bind(this));

    var newSnapShot = {
      labels: currentChart.keywords,
      datasets: newDatasets
    }
    this._byChartID(chartID).snapShot = newSnapShot
    this.emit("change");
  },

  handleAddKeyword: function(payload, type) {
    var chartID = payload.id
    var data = payload.data
    this._byChartID(chartID).keywords.push(data)
    this.update(chartID)
  },
  handleRemoveKeyword: function(payload, type) {
    var chartID = payload.id
    var data = payload.data
    this._byChartID(chartID).keywords.splice(data, 1)
    this.update(chartID)
  },
  handleAddPublisher: function(payload, type) {
    var chartID = payload.id
    var data = payload.data
    this._byChartID(chartID).publishers.push(data)
    this.update(chartID)
  },
  handleRemovePublisher: function(payload, type) {
    var chartID = payload.id
    var data = payload.data
    this._byChartID(chartID).publishers.splice(data, 1)
    this.update(chartID)
  },
  handleChangeDateRange: function(payload, type) {
    var chartID = payload.id
    var data = payload.data
    this._byChartID(chartID).startDate = data[0]
    this._byChartID(chartID).endDate = data[1]
    this.update(chartID)
  },
  getSnapShot: function(chartID){
    if (this._byChartID(chartID).snapShot) {
      return this._byChartID(chartID).snapShot
    } else {
      return {
        labels: [],
        datasets: [{
          label: "",
          data: []
        }]
      }
    }
  },
  getKeywords: function(chartID){
    if (this._byChartID(chartID).keywords) {
      return this._byChartID(chartID).keywords
    } else {
      return []
    }
  },
  getPublishers: function(chartID){
    if (this._byChartID(chartID).publishers) {
      return this._byChartID(chartID).publishers
    } else {
      return []
    }
  },
  getStartDate: function(chartID){
    return this._byChartID(chartID).startDate
  },
  getEndDate: function(chartID){
    return this._byChartID(chartID).endDate
  },
  getAllDates: function(){
    return this.dates
  }

});
