import Fluxxor from 'fluxxor'
import color from '../services/color'
import makeDates from '../services/makeDates'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.snapShot =  {
      labels: [],
      datasets: [
        {
            label: "",
            data: []
        }
      ]
    }

    this.dates = makeDates()
    this.startDate = 0
    this.endDate = (this.dates.length -1)
    this.keywords = ["harper", "mulcair", "trudeau"]
    this.publishers = [{id: 1, domain: "theglobeandmail.com"}, {id: 2, domain: "nationalpost.com"}, {id: 3, domain: "cbc.ca"}]
    this.datastore = []

    this.bindActions(
      "LOAD_SNAPSHOT_DATA", this.load,
      "UPDATE_CHART", this.update,
      "ADD_KEYWORD", this.handleAddKeyword,
      "REMOVE_KEYWORD", this.handleRemoveKeyword,
      "ADD_PUBLISHER", this.handleAddPublisher,
      "REMOVE_PUBLISHER", this.handleRemovePublisher,
      "CHANGE_DATE_RANGE", this.handleChangeDateRange

    );
  },
  load: function(payload, type){
    this.datastore = payload
    this.emit("change");
  },
  update: function(){
    var dateMatch = function (row) {
      var date = new Date(row.date);
      var startDate = new Date(this.dates[this.startDate])
      var endDate = new Date(this.dates[this.endDate])
      return ((date >= startDate) && (date <= endDate))
    }.bind(this)

    var filteredArr = this.datastore.filter(dateMatch);
    var newDatasets = []

    this.publishers.forEach(function(publisher, index) {
      var wordcount = this.keywords.map(function(keyword) {
        var sum = 0
        filteredArr.forEach(function(row) {
          if ( (publisher.id == row.publisher_id) && (keyword == row.word) ) {
            sum += row.nentry
          }
        })
        return sum
      })
      var dataset = {
        // label: publisher.toString(),
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
      labels: this.keywords,
      datasets: newDatasets
    }
    this.snapShot = newSnapShot
    this.emit("change");
  },

  handleAddKeyword: function(payload, type) {
    this.keywords.push(payload)
    this.update()
  },
  handleRemoveKeyword: function(payload, type) {
    this.keywords.splice(this.keywords.indexOf(payload), 1)
    this.update()
  },
  handleAddPublisher: function(payload, type) {
    this.publishers.push(payload)
    this.update()
  },
  handleRemovePublisher: function(payload, type) {
    this.publishers.splice(payload, 1)
    this.update()
    console.log("new publishers list after deletion")
    console.log(this.publishers)
  },
  handleChangeDateRange: function(payload, type) {
    this.startDate = payload[0]
    this.endDate = payload[1]
    this.update()
  },
  getSnapShot: function(){
    return this.snapShot
  },
  getKeywords: function(){
    return this.keywords
  },
  getPublishers: function(){
    console.log("snapshotstore get publishers returns:")
    console.log(this.publishers)
    return this.publishers
  },
  getStartDate: function(){
    return this.startDate
  },
  getEndDate: function(){
    return this.endDate
  },
  getAllDates: function(){
    return this.dates
  },

});
