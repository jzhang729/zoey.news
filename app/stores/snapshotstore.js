import Fluxxor from 'fluxxor'

export default Fluxxor.createStore({
  // actions: {
  //   "CHANGE_TIME_SCOPE": "handleChangeTimeScope"

  // },

  initialize: function(options) {
    this.snapShot =  {
      labels: ["ISIS", "terror", "RCMP"],
      datasets: [
        {
            label: "Globe and Mail",
            data: [10, 20, 30]
        },
        {
            label: "Vancouver Sun",
            data: [4, 50, 10]
        },
        {
            label: "National Post",
            data: [12, 15, 40]
        }
      ]
    }
    this.startDate = new Date()
    this.endDate = new Date()

    this.bindActions(
      "LOAD_SNAPSHOT", this.load,
      "UPDATE_CHART", this.update
    );
  },
  load: function(payload, type){
    this.snapShot = payload
    this.emit("change");
  },
  update: function(payload, type){
    this.snapShot = payload
    this.emit("change");
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