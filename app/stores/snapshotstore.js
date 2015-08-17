import Fluxxor from 'fluxxor'
import color from '../services/color'
import makeDates from '../services/makeDates'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.snapShot = []

    this.dates = makeDates()
    this.startDate = []
    this.endDate = []
    this.keywords = []
    this.publishers = []
    this.datastore = []

    this.bindActions(
      "LOAD_SNAPSHOT_DATA", this.load,
      "UPDATE_CHART", this.update,
      "ADD_KEYWORD", this.handleAddKeyword,
      "REMOVE_KEYWORD", this.handleRemoveKeyword,
      "ADD_PUBLISHER", this.handleAddPublisher,
      "REMOVE_PUBLISHER", this.handleRemovePublisher,
      "CHANGE_DATE_RANGE", this.handleChangeDateRange,
      "LOAD_CHARTS", this.handleLoadCharts
    );
  },
  handleLoadCharts: function(charts) {
    this.keywords = charts.map(function(chart) {
      return chart.params.keywords
    })
    this.publishers = charts.map(function(chart) {
      return chart.params.publishers
    })
    this.datastore = charts.map(function(chart) {
      return []
    })
    this.startDate = charts.map(function(chart) {
      return 0
    })
    this.endDate = charts.map(function(chart) {
      return (this.dates.length -1)
    }.bind(this))
  },
  load: function(payload, type){
    var id = payload.id
    var data = payload.data
    this.datastore[id] = data
    this.emit("change");
  },
  update: function(id){
    var dateMatch = function (row) {
      var date = new Date(row.date);
      var startDate = new Date(this.dates[this.startDate[id]])
      var endDate = new Date(this.dates[this.endDate[id]])
      return ((date >= startDate) && (date <= endDate))
    }.bind(this)

    var filteredArr = this.datastore[id].filter(dateMatch);
    var newDatasets = []
    console.log(this.datastore[id])

    this.publishers[id].forEach(function(publisher, index) {
      var wordcount = this.keywords[id].map(function(keyword) {
        console.log(keyword)
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
      labels: this.keywords[id],
      datasets: newDatasets
    }
    this.snapShot[id] = newSnapShot
    this.emit("change");
  },

  handleAddKeyword: function(payload, type) {
    var id = payload.id
    var data = payload.data
    this.keywords[id].push(data)
    this.update(id)
  },
  handleRemoveKeyword: function(payload, type) {
    var id = payload.id
    var data = payload.data
    this.keywords[id].splice(data, 1)
    this.update(id)
  },
  handleAddPublisher: function(payload, type) {
    var id = payload.id
    var data = payload.data
    this.publishers[id].push(data)
    this.update(id)
  },
  handleRemovePublisher: function(payload, type) {
    var id = payload.id
    var data = payload.data
    this.publishers[id].splice(data, 1)
    this.update(id)
  },
  handleChangeDateRange: function(payload, type) {
    var id = payload.id
    var data = payload.data
    this.startDate[id] = data[0]
    this.endDate[id] = data[1]
    this.update(id)
  },
  getSnapShot: function(id){
    if (this.snapShot[id]) {
      return this.snapShot[id]
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
  getKeywords: function(id){
    return this.keywords[id]
  },
  getPublishers: function(id){
    return this.publishers[id]
  },
  getStartDate: function(id){
    return this.startDate[id]
  },
  getEndDate: function(id){
    return this.endDate[id]
  },
  getAllDates: function(id){
    return this.dates[id]
  }

});
