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
      }.bind(this));
  },

  updateChart: function() {
    var payload =
    {
      labels: ["ISIS", "terror", "RCMP", "Mulcair"],
      datasets: [
        {
            label: "Globe and Mail",
            data: [38, 99, 32, 17]
        },
        {
            label: "Vancouver Sun",
            data: [18, 10, 9, 32]
        },
        {
            label: "National Post",
            data: [17, 5, 60, 5]
        }
      ]
    }
    this.dispatch("UPDATE_CHART", payload)
  }
}


var stores = {
  SnapShotStore: new SnapShotStore()
}
var flux = new Fluxxor.Flux(stores, actions);

React.render(<App flux={flux} />, document.getElementById('content'))

console.log('Application is loaded!');
