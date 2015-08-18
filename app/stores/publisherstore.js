import Fluxxor from 'fluxxor'

export default Fluxxor.createStore({

  initialize: function(options) {
    this.publishers = []

    this.bindActions(
      "LOAD_PUBLISHERS", this.load
    );
  },

  load: function(payload, type) {
    this.publishers = payload
    this.emit("change");
  },

  getPublishers: function(){
    console.log("getPublishers")
    return this.publishers
  }
});
