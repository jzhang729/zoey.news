var css = require('!css!sass!autoprefixer!./css/main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
// require('!style!css!sass!./main.scss');
require('!style!css!sass!autoprefixer!./css/main.scss');

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

  loadCharts: function() {
    var route = '/users/1/charts'
    var success = function(err, resp){
      var allPubObjects = this.flux.store("PublisherStore").getPublishers()
      var charts = JSON.parse(resp.text).map(function(chart) {

        var chartPubsWithNames = [];
        allPubObjects.forEach(function(publisher) {
          if (chart.chart_params.publishers.indexOf(publisher.id) >= 0) {
            chartPubsWithNames.push(publisher)
          }
        })
        return {
          chartID: chart.id,
          chartType: chart.chart_params.chart_type,
          title: chart.chart_params.title,
          keywords: chart.chart_params.keywords,
          publishers: chartPubsWithNames
        }
      }.bind(this))
      this.dispatch("LOAD_CHARTS", charts)
    }.bind(this)
    requestManager.get(route, success)
  },

  addChart: function(type) {
    

    // this.dispatch("LOAD_CHARTS", [chart])

    // var chartID = chart.chartID
    // var keywordsList = chart.keywords
    // var publishersList = chart.publishers
    // var publisherIds = publishersList.map(function(publisher) {
    //   return publisher.id
    // })

    var route = '/charts'
    var success = function(err, resp) {
      console.log(resp)
      // var dataRows = JSON.parse(resp.text);
      // this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
      // this.dispatch("UPDATE_CHART", chartID)
    }.bind(this)
    requestManager.post(route, success)
  },

  loadChartData: function(chartID) {
    var route = '/charts/show/' + chartID
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
      this.dispatch("UPDATE_CHART", chartID)
    }.bind(this)
    requestManager.get(route, success)
  },

  updateChart: function(chartID) {
    this.dispatch("UPDATE_CHART", chartID)
  },

  addKeyword: function(chartID, newKeyword) {
    var keywordsList = this.flux.store("SnapShotStore").getKeywords(chartID)
    if (keywordsList.indexOf(newKeyword) < 0) {
      var route = 'charts/id'
      var success = function(err, resp) {
        var dataRows = JSON.parse(resp.text);
        this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
        this.dispatch("ADD_KEYWORD", {id: chartID, data: newKeyword})
      }.bind(this)
      requestManager.put(route, {keywords: keywordList.concat(newKeyword)}, success)
    }
  },

  removeKeyword: function(chartID, keywordIndex) {
    var route = 'charts/id'
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("REMOVE_KEYWORD", {id: chartID, data: keywordIndex})
    }.bind(this)
      requestManager.put(route, {keywords: keywordList.splice(keywordIndex, 1)}, success)
  },

  addPublisher: function(chartID, publisherID) {
    var publisherList = this.flux.store("PublisherStore").getPublishers()
    var keywordsList = this.flux.store("SnapShotStore").getKeywords(chartID)
    var activePublisherIDs = this.flux.store("SnapShotStore").getPublishers(chartID).map(function(publisher) {
      return publisher.id
    })
    var addedPublisher = publisherList.filter(function(publisher) {
      if (publisher.id == publisherID) {
        return publisher
      }
    })[0]

    if (activePublisherIDs.indexOf(addedPublisher.id) < 0) {
      var route = routeService.apiUrl(keywordsList, activePublisherIDs.concat(addedPublisher.id))
      var success = function(err, resp) {
        var dataRows = JSON.parse(resp.text);
        this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
        this.dispatch("ADD_PUBLISHER", {id: chartID, data: addedPublisher})
      }.bind(this)
      requestManager.get(route, success)
    }
  },

  removePublisher: function(chartID, publisher) {
    this.dispatch("REMOVE_PUBLISHER", {id: chartID, data: publisher})
  },

  // this takes an array of index values
  // ie [0, 2] which corresponds to the first
  // and third dates in the store's list
  changeDateRange: function(chartID, dates) {
    this.dispatch("CHANGE_DATE_RANGE", {id: chartID, data: dates})
  }
}

var stores = {
  SnapShotStore: new SnapShotStore(),
  PublisherStore: new PublisherStore(),
}
var flux = new Fluxxor.Flux(stores, actions);

React.render(<App flux={flux} />, document.getElementById('content'))
