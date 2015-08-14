import Fluxxor from 'fluxxor'
import ColorRandomizer from '../components/colorrandomizer'

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
            data: [10, 20, 30],
            fillColor: ColorRandomizer.data1Fill,
            strokeColor: ColorRandomizer.data1Stroke,
            highlightFill: ColorRandomizer.data1Highlight,
            highlightStroke: ColorRandomizer.data1Highlight,
        },
        {
            label: "Vancouver Sun",
            data: [20, 30, 40],
            fillColor: ColorRandomizer.data2Fill,
            strokeColor: ColorRandomizer.data2Outline,
            highlightFill: ColorRandomizer.data2Highlight,
            highlightStroke: ColorRandomizer.data2Highlight,
        },
        {
            label: "National Post",
            data: [30, 40, 50],
            fillColor: ColorRandomizer.data3Fill,
            strokeColor: ColorRandomizer.data3Outline,
            highlightFill: ColorRandomizer.data3Highlight,
            highlightStroke: ColorRandomizer.data3Hightlight,
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