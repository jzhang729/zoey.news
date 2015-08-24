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
import buildPublishersForChart from './services/buildPublishersForChart'


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
      var allPublishers = flux.store("PublisherStore").getPublishers()
      var charts = JSON.parse(resp.text).map(function(chart) {
        var chartPubsWithNames = buildPublishersForChart(chart, allPublishers)
        return {
          chartID: chart.id,
          chartType: chart.chart_type,
          title: chart.chart_title,
          keywords: chart.keywords.split(','),
          publishers: chartPubsWithNames
        }
      }.bind(this))
      this.dispatch("LOAD_CHARTS", charts)
    }.bind(this)
    requestManager.get(route, success)
  },

  loadChartData: function(chartID) {
    var route = '/charts/data/' + chartID
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
    }.bind(this)
    requestManager.get(route, success)
  },

  addChart: function(type) {
    var params = {chartType: type}
    var route = '/charts'
    var postSuccess = function(err, resp) {
      // we have the ID of the chart we just added
      var newChartID = resp.body[0]
      // now get its metadata
      var route = '/charts/' + newChartID
      var getSuccess = function(err, resp) {
        var chart = JSON.parse(resp.text)
        // flesh out the publishers list with publisher names
        var allPublishers = this.flux.store("PublisherStore").getPublishers()
        var chartPubsWithNames = buildPublishersForChart(chart, allPublishers)
        // create chart literal so we can pass to the Flux store
        var completeChart = {
          chartID: chart.id,
          chartType: chart.chart_type,
          title: chart.title,
          keywords: chart.keywords.split(','),
          publishers: chartPubsWithNames
        }
        this.dispatch("LOAD_CHARTS", [completeChart])
      }.bind(this);
      requestManager.get(route, getSuccess)
    }.bind(this);
    requestManager.post(route, params, postSuccess)
  },

  deleteChart: function(chartID) {
    var route = '/charts/' + chartID
    var success = function(err, resp) {
      this.dispatch("DELETE_CHART", chartID)
    }.bind(this);
    requestManager.del(route, success)
  },

  updateKeywords: function(chartID) {
    var keywordsList = this.flux.store("SnapShotStore").getKeywords(chartID)
    var params = {keywords: keywordsList.toString().trim()}
    var route = 'charts/' + chartID
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
    }.bind(this)

    requestManager.put(route, params, success)
  },

  updatePublishers: function(chartID) {
    var publishersList = this.flux.store("SnapShotStore").getPublishers(chartID)
    var publishersIDList = publishersList.map(function(publisher) {
      return publisher.id;
    })
    var params = {publishers: publishersIDList.toString()}
    var route = 'charts/' + chartID
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("LOAD_CHART_DATA", {id: chartID, data: dataRows})
    }.bind(this)
    requestManager.put(route, params, success)
  },

  updateChartTitle: function(chartID, newTitle) {
    var route = 'charts/' + chartID
    var params = {chart_title: newTitle}
    var success = function(err, resp) {
      this.dispatch("UPDATE_CHART_TITLE", chartID, newTitle)
    }.bind(this)
    requestManager.put(route, params, success)
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
