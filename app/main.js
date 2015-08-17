var css = require('!css!sass!autoprefixer!./main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
// require('!style!css!sass!./main.scss');
require('!style!css!sass!autoprefixer!./main.scss');
require('!style!css!./slider.css')

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

  // this takes an array of index values
  // ie [0, 2] which corresponds to the first
  // and third dates in the store's list
  changeDateRange: function(dates) {
    this.dispatch("CHANGE_DATE_RANGE", dates)
  }

}


var stores = {
  SnapShotStore: new SnapShotStore(),
  PublisherStore: new PublisherStore()
}
var flux = new Fluxxor.Flux(stores, actions);

React.render(<App flux={flux} />, document.getElementById('content'))
