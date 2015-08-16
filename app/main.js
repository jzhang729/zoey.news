var css = require('!css!sass!./main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
require('!style!css!sass!./main.scss');

import React from 'react'
import App from './components/app.js'
import Fluxxor from 'fluxxor'
import SnapShotStore from './stores/snapshotstore'
import PublisherStore from './stores/publisherstore'
import routeService from './services/routeservice'
import requestManager from './services/requestManager'

var actions = {

  loadPublishers: function() {
    var route = '/publishers'
    var success = function(err, resp){
        var data = JSON.parse(resp.text);
        this.dispatch("LOAD_PUBLISHERS", data)
      }.bind(this)
    requestManager.get(route, success)
  },

  loadChartData: function(keywords, publishers) {
    var route = routeService.apiUrl(keywords, publishers)
    var success = function(err, resp) {
      var data = JSON.parse(resp.text);
      this.dispatch("LOAD_SNAPSHOT_DATA", data)
      this.dispatch("UPDATE_CHART")
    }.bind(this)
    requestManager.get(route, success)
  },

  updateChart: function() {
    this.dispatch("UPDATE_CHART")
  },

  addKeyword: function(keyword) {
    var keywordsList = this.flux.store("SnapShotStore").getKeywords()
    var publishersList = this.flux.store("SnapShotStore").getPublishers()
    
    if (keywordsList.indexOf(keyword) < 0) {
      var route = routeService.apiUrl(keywordsList.concat(keyword), publishersList)
      var success = function(err, resp) {
        var data = JSON.parse(resp.text);
        this.dispatch("LOAD_SNAPSHOT_DATA", data)
        this.dispatch("ADD_KEYWORD", keyword)
      }.bind(this)
      requestManager.get(route, success)
    }
  },

  removeKeyword: function(index) {
    this.dispatch("REMOVE_KEYWORD", index)
  },

  addPublisher: function(publisher) {
    var keywordsList = this.flux.store("SnapShotStore").getKeywords()
    var publishersList = this.flux.store("SnapShotStore").getPublishers()
    
    if (publishersList.indexOf(publisher) < 0) {
      var route = routeService.apiUrl(keywordsList, publishersList.concat(publisher))
      var success = function(err, resp) {
        var data = JSON.parse(resp.text);
        this.dispatch("LOAD_SNAPSHOT_DATA", data)
        this.dispatch("ADD_PUBLISHER", publisher)
      }.bind(this)
      requestManager.get(route, success)
    }
  },

  removePublisher: function(publisher) {
    this.dispatch("REMOVE_PUBLISHER", publisher)
  },

  changeStartDate: function(date) {
    this.dispatch("CHANGE_START_DATE", date)
  },

  changeEndDate: function(date) {
    this.dispatch("CHANGE_END_DATE", date)
  }
}


var stores = {
  SnapShotStore: new SnapShotStore(),
  PublisherStore: new PublisherStore()
}
var flux = new Fluxxor.Flux(stores, actions);

React.render(<App flux={flux} />, document.getElementById('content'))

console.log('Application is loaded!');
