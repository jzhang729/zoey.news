import Fluxxor from 'fluxxor'

export default Fluxxor.createStore({
  // actions: {
  //   "CHANGE_TIME_SCOPE": "handleChangeTimeScope"

  // },

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
    this.keywords = ["mulcair", "harper"]
    this.publishers = [1, 2]
    this.datastore = []

    this.bindActions(
      "LOAD_SNAPSHOT_DATA", this.load,
      "UPDATE_CHART", this.update
    );
  },
  load: function(payload, type){
    this.datastore = this.datastore.concat(payload)
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
          contains = true
        }
      });
      return contains
    }.bind(this)

    var filteredArr = this.datastore.filter(dateMatch).filter(keywordsMatch);

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
  addKeyword: function(keyword) {
    this.keywords.push(keyword)
  },
  addPublisher: function(publisher) {
    this.publishers.push(publisher)
  },
  handleChangeTimeScope: function(payload, type) {
    console.log()
  },
  getSnapShot: function(){
    return this.snapShot
  },
  getStartDate: function(){
    return this.startDate
  },
  getEndDate: function(){
    return this.endDate
  },
});