var css = require('!css!sass!autoprefixer!./css/main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
// require('!style!css!sass!./main.scss');
require('!style!css!sass!autoprefixer!./css/main.scss');

import React from 'react'
import App from './components/app.js'
import Fluxxor from 'fluxxor'
import SnapShotStore from './stores/snapshotstore'
import PublisherStore from './stores/publisherstore'
import ChartStore from './stores/chartstore'
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
    var charts =
    [ {chartID: 0,
      chartType: "snapshot",
      params: {title: "Leaders",
              keywords: ["Mulcair", "Trudeau", "Harper"],
              publishers: [{id: 3, domain: "theglobeandmail.com"}, {id: 4, domain: "nationalpost.com"}, {id: 5, domain: "cbc.ca"}]
              }
      },
      {chartID: 1,
      chartType: "snapshot",
      params: {title: "Security",
              keywords: ["ISIS", "Terrorism", "RCMP"],
              publishers: [{id: 3, domain: "theglobeandmail.com"}, {id: 4, domain: "nationalpost.com"}, {id: 5, domain: "cbc.ca"}]
              }
      }
    ]
    this.dispatch("LOAD_CHARTS", charts)
  },

  loadChartData: function(chartID, keywords, publishers) {
    var publisherIds = publishers.map(function(publisher) {
      return publisher.id
    })
    var route = routeService.apiUrl(keywords, publisherIds)
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("LOAD_SNAPSHOT_DATA", {id: chartID, data: dataRows})
      this.dispatch("UPDATE_CHART", chartID)
    }.bind(this)
    requestManager.get(route, success)
  },

  updateChart: function(chartID) {
    this.dispatch("UPDATE_CHART", chartID)
  },

  addKeyword: function(chartID, keyword) {
    var keywordsList = this.flux.store("SnapShotStore").getKeywords(chartID)
    var publishersList = this.flux.store("SnapShotStore").getPublishers(chartID).map(function(publisher) {
      return publisher.id
    })
    if (keywordsList.indexOf(keyword) < 0) {
      var route = routeService.apiUrl(keywordsList.concat(keyword), publishersList)
      var success = function(err, resp) {
        var dataRows = JSON.parse(resp.text);
        this.dispatch("LOAD_SNAPSHOT_DATA", {id: chartID, data: dataRows})
        this.dispatch("ADD_KEYWORD", {id: chartID, data: keyword})
      }.bind(this)
      requestManager.get(route, success)
    }
  },

  removeKeyword: function(chartID, keywordIndex) {
    this.dispatch("REMOVE_KEYWORD", {id: chartID, data: keywordIndex})
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

    var route = routeService.apiUrl(keywordsList, activePublisherIDs.concat(publisherID))
    var success = function(err, resp) {
      var dataRows = JSON.parse(resp.text);
      this.dispatch("LOAD_SNAPSHOT_DATA", {id: chartID, data: dataRows})
      this.dispatch("ADD_PUBLISHER", {chartID: chartID, publisher: addedPublisher})
    }.bind(this)
    requestManager.get(route, success)
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
  ChartStore: new ChartStore()
}
var flux = new Fluxxor.Flux(stores, actions);

React.render(<App flux={flux} />, document.getElementById('content'))
