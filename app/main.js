var css = require('!css!sass!./main.scss');
// => returns compiled css code from file.scss, resolves imports and url(...)s
require('!style!css!sass!./main.scss');

import React from 'react'
import App from './components/app.js'
import Fluxxor from 'fluxxor'
import request from 'superagent'
var actions = {
  loadChart: function(k,p,d) {
    var route = '/test'
    // k.forEach(word, index) {
    //   route += word + ','
    // }
    // route = route.slice(0, -1)
    // route += '&p='
    // p.forEach(pub, index) {
    //   route += pub + ','
    // }
    // route = route.slice(0, -1)
    // d.forEach(date, index) {
    //   route += date + ','
    // }
    // route = route.slice(0, -1)

    request
      .get(route)
      .set('Accept', 'application/json')
      .end(function(err, res){
        console.log(res);
      });
  }
}
var flux = new Fluxxor.Flux({}, actions);

React.render(<App flux={flux} />, document.getElementById('content'))

console.log('Application is loaded!');
