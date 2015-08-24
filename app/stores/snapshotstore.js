import Fluxxor from 'fluxxor'
import barchartcolor from '../services/barchartcolor'
import linechartcolor from '../services/linechartcolor'
import donutchartcolor from '../services/donutchartcolor'
import makeDates from '../services/makeDates'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.charts = []
    this.dates = makeDates()
    this.bindActions(
      "LOAD_CHART_DATA", this.loadChartData,
      "UPDATE_CHART", this.handleUpdateChart,
      "ADD_PUBLISHER", this.handleAddPublisher,
      "REMOVE_PUBLISHER", this.handleRemovePublisher,
      "CHANGE_DATE_RANGE", this.handleChangeDateRange,
      "LOAD_CHARTS", this.handleLoadCharts,
      "DELETE_CHART", this.handleDeleteChart,
      "UPDATE_CHART_TITLE", this.handleUpdateChart
    );
  },
  getCharts: function() {
    return this.charts.map(function(chart) {
      return {chartID: chart.chartID,
              chartType: chart.chartType,
              title: chart.title,
              data: chart.snapShot,
              startDate: chart.startDate,
              endDate: chart.endDate,
              keywords: chart.keywords
      }
    })
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
      chart.snapShot = false
      return chart
    }.bind(this))
    this.charts = this.charts.concat(newCharts)
    this.emit("change")
  },
  loadChartData: function(payload, type) {
    var id = payload.id
    var data = payload.data
    this._byChartID(id).datastore = data
    this.handleUpdateChart(id)
  },
  handleUpdateChart: function(chartID) {
    switch (this._byChartID(chartID).chartType) {
      case "barchart":
        this.updateBarChart(chartID)
        break
      case "timelapse":
        this.updateTimeLapse(chartID)
        break
      case "donut":
        this.updateDonut(chartID)
        break
    }
  },
  updateTimeLapse: function(chartID) {
    var currentChart = this._byChartID(chartID)
    var newDatasets = []
    var activePublisherIDs = currentChart.publishers.map(function(publisher) {
      return publisher.id
    })
    currentChart.keywords.forEach(function(keyword, index) {
      var dailyCount = this.dates.map(function(date) {
        var sum = 0

        currentChart.datastore.forEach(function(row) {
          if ( (date == row.date) && (keyword == row.word) && (activePublisherIDs.indexOf(row.publisher_id) >= 0) ) {
            sum += row.nentry
          }
        })
        return sum
      })
      var dataset = {
        label: keyword,
        data: dailyCount,
        fillColor: linechartcolor.Fill[index],
        strokeColor: linechartcolor.Stroke[index],
        pointColor: linechartcolor.Point[index],
        pointStrokeColor: linechartcolor.PointStroke[index],
        pointHighlightFill: linechartcolor.PointHighlightFill[index],
        pointHighlightStroke: linechartcolor.PointHighlightStroke[index]

      }
      newDatasets.push(dataset)
    }.bind(this));

    var newSnapShot = {
      labels: this.dates,
      datasets: newDatasets
    }
    this._byChartID(chartID).snapShot = newSnapShot
    this.emit("change");
  },
  updateBarChart: function(chartID){
    var currentChart = this._byChartID(chartID)
    var dateMatch = function (row) {
      var date = new Date(row.date);
      var startDate = new Date(this.dates[currentChart.startDate])
      var endDate = new Date(this.dates[currentChart.endDate])
      return ((date >= startDate) && (date <= endDate))
    }.bind(this)

    var filteredDatastore = currentChart.datastore.filter(dateMatch);
    var newDatasets = []
    currentChart.publishers.forEach(function(publisher, index) {
      var wordcount = currentChart.keywords.map(function(keyword) {
        var sum = 0
        filteredDatastore.forEach(function(row) {
          if ( (publisher.id == row.publisher_id) && (keyword == row.word) ) {
            sum += row.nentry
          }
        })
        return sum
      })
      var dataset = {
        label: publisher.domain,
        data: wordcount,
        fillColor: barchartcolor.Fill[index],
        strokeColor: barchartcolor.Stroke[index],
        highlightFill: barchartcolor.HighlightFill[index],
        highlightStroke: barchartcolor.HighlightStroke[index]
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
  updateDonut: function(chartID){
    var currentChart = this._byChartID(chartID)
    var dateMatch = function (row) {
      var date = new Date(row.date);
      var startDate = new Date(this.dates[currentChart.startDate])
      var endDate = new Date(this.dates[currentChart.endDate])
      return ((date >= startDate) && (date <= endDate))
    }.bind(this)
    var filteredDatastore = currentChart.datastore.filter(dateMatch);

    var newDataset = []
    var wordcount = currentChart.keywords.map(function(keyword, index) {
      var sum = 0
      filteredDatastore.forEach(function(row) {
        if (keyword == row.word){
          sum += row.nentry
        }
      })
      var dataset = {
        value: sum,
        label: keyword,
        color: donutchartcolor.Fill[index],
        highlight: donutchartcolor.Fill[index]
      }
      newDataset.push(dataset)
    }.bind(this));
    this._byChartID(chartID).snapShot = newDataset
    this.emit("change");
  },
  handleAddPublisher: function(payload, type) {
    this._byChartID(payload.id).publishers.push(payload.data)
    this.handleUpdateChart(payload.id)
  },
  handleRemovePublisher: function(payload, type) {
    var chartID = payload.id
    var publisherIndex = payload.publisherIndex
    this._byChartID(chartID).publishers.splice(publisherIndex, 1)
    this.handleUpdateChart(chartID)
  },
  handleChangeDateRange: function(payload, type) {
    var chartID = payload.id
    var data = payload.data
    this._byChartID(chartID).startDate = data[0]
    this._byChartID(chartID).endDate = data[1]
    this.handleUpdateChart(chartID)
  },
  handleDeleteChart: function(deletedChartID) {
    var deleteIndex
    this.charts.forEach(function(chart, index) {
      if (chart.chartID == deletedChartID) {
        deleteIndex = index
      }
    })
    this.charts.splice(deleteIndex, 1)
    this.emit("change")
  },
  handleUpdateChartTitle: function(chartID, newTitle) {
    this._byChartID(chartID).chart_title = newTitle
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
