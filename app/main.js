var css = require('!css!sass!./main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
require('!style!css!sass!./main.scss');

import React from 'react'
import App from './components/app.js'
import Fluxxor from 'fluxxor'
import request from 'superagent'
import SnapShotStore from './stores/snapshotstore'

var actions = {
  loadChartData: function(k,p) {
    var route = '/detail?&k=';
    k.forEach(function(word) {
      route += word + ','
    });
    route = route.slice(0, -1)
    route += '&p='
    p.forEach(function(pub) {
      route += pub + ','
    });
    route = route.slice(0, -1)

    request
      .get(route)
      .set('Accept', 'application/json')
      .end(function(err, res){
        var data = JSON.parse(res.text);
        this.dispatch("LOAD_SNAPSHOT_DATA", data)
        this.dispatch("UPDATE_CHART")
      }.bind(this));
  },

  updateChart: function() {
    this.dispatch("UPDATE_CHART")
  },

  addKeyword: function(keyword) {
    this.dispatch("ADD_KEYWORD", keyword)
    this.dispatch("UPDATE_CHART")
  },

  removeKeyword: function(index) {
    this.dispatch("REMOVE_KEYWORD", index)
    this.dispatch("UPDATE_CHART")
  },

  addPublisher: function(keyword) {
    this.dispatch("ADD_PUBLISHER", keyword)
    this.dispatch("UPDATE_CHART")
  },

  removePublisher: function(keyword) {
    this.dispatch("REMOVE_PUBLISHER", keyword)
    this.dispatch("UPDATE_CHART")
  },

  changeStartDate: function(date) {
    this.dispatch("CHANGE_START_DATE", date)
    this.dispatch("UPDATE_CHART")
  },

  changeEndDate: function(date) {
    this.dispatch("CHANGE_END_DATE", date)
    this.dispatch("UPDATE_CHART")
  }
}


var stores = {
  SnapShotStore: new SnapShotStore()
}
var flux = new Fluxxor.Flux(stores, actions);

React.render(<App flux={flux} />, document.getElementById('content'))

console.log('Application is loaded!');
