import Fluxxor from 'fluxxor'
import color from '../services/color'

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

    this.startDate = new Date("2015-08-04")
    this.endDate = new Date("2015-08-05")
    this.keywords = ["harper", "mulcair", "trudeau"]
    this.publishers = [1, 2, 3]
    this.datastore = []

    this.bindActions(
      "LOAD_SNAPSHOT_DATA", this.load,
      "UPDATE_CHART", this.update,
      "ADD_KEYWORD", this.handleAddKeyword,
      "REMOVE_KEYWORD", this.handleRemoveKeyword,
      "ADD_PUBLISHER", this.handleAddPublisher,
      "REMOVE_PUBLISHER", this.handleRemovePublisher,
      "CHANGE_START_DATE", this.handleChangeStartDate,
      "CHANGE_END_DATE", this.handleChangeEndDate

    );
  },
  load: function(payload, type){
    this.datastore = payload
    this.emit("change");
  },
  update: function(payload, type){
    // this.keywords = payload[0]
    // this.publishers = payload[1]
    var dateMatch = function (row) {
      var date = new Date(row.date);
      return ((date >= this.startDate) && (date <= this.endDate))
    }.bind(this)

    var keywordsMatch = function (row) {
      var keyword = row.word
      var contains = false
      this.keywords.forEach(function(w) {
        if (w == keyword) {
          contains = true
        }
      });
      return contains
    }.bind(this)

    var filteredArr = this.datastore.filter(dateMatch).filter(keywordsMatch);
    var newDatasets = []

    this.publishers.forEach(function(p, index) {
      var pub = p
      var wordcount = this.keywords.map(function(w) {
        var word = w
        var sum = 0
        filteredArr.forEach(function(row) {
          if ( (pub == row.publisher_id) && (word == row.word) ) {
            sum += row.nentry
          }
        })
        return sum
      })
      var dataset = {
        label: pub.toString(),
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
    this.keywords.splice(payload, 1)
    this.update()
  },
  handleAddPublisher: function(payload, type) {
    this.publishers.push(payload)
    this.update()
  },
  handleRemovePublisher: function(payload, type) {
    this.publishers.splice(payload, 1)
    this.update()
  },
  handleChangeStartDate: function(payload, type) {
    this.startDate = new Date(payload)
    this.update()
  },
  handleChangeEndDate: function(payload, type) {
    this.endDate = new Date(payload)
    this.update()
  },
  getSnapShot: function(){
    return this.snapShot
  },
  getKeywords: function(){
    return this.keywords
  },
  getPublishers: function(){
    return this.publishers
  },
  getStartDate: function(){
    return this.startDate
  },
  getEndDate: function(){
    return this.endDate
  },
});
