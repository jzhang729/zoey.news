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
    console.log(this.publishers)
    this.emit("change");
  }
});