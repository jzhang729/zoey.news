import Fluxxor from 'fluxxor'


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
    this.keywords = ["harper", "mulcair"]
    this.publishers = [1]
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
    this.datastore = this.datastore.concat(payload)
    console.log(this.datastore)
    this.emit("change");
  },
  update: function(payload, type){

    var dateMatch = function (row) {
      var date = new Date(row.date);
      return ((date >= this.startDate) && (date <= this.endDate))
    }.bind(this)

    var keywordsMatch = function (row) {
      var keyword = row.word
      var contains = false
      this.keywords.forEach(function(w) {
        if (w == keyword) {
          console.log(row)
          contains = true
        }
      });
      return contains
    }.bind(this)

    var filteredArr = this.datastore.filter(dateMatch).filter(keywordsMatch);
    console.log(this.datastore)
    console.log(filteredArr)
    var newDatasets = []

    this.publishers.forEach(function(p) {
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
        data: wordcount
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
    // TODO: Don't accept keyword if it's already in array
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
