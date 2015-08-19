var express = require('express');
var bodyParser = require("body-parser")
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

var queryDetail = require('./sql_builder').queryDetail;
var getPublisherList = require('./sql_builder').getPublisherList;
var getCharts = require('./sql_builder').getCharts;
var getChart = require('./sql_builder').getChart;
var getChartData = require('./sql_builder').getChartData;
var addChart = require('./sql_builder').addChart;

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.all('/db/*', function (req, res) {
  proxy.web(req, res, {
    target: 'https://glowing-carpet-4534.firebaseio.com/'
  });
});

app.get('/detail', function(req, res) {
  var keywords = req.query.k;
  var publishers = req.query.p;
  queryDetail(keywords, publishers, function(resp) {
    res.send(resp.rows);
  });
});

app.get('/publishers', function(req, res) {
  getPublisherList(function(resp) {
    res.send(resp);
  });
});

app.get('/users/:user/charts', function(req, res) {
  getCharts(req.params.user, function(resp) {
    res.send(resp);
  });
});

/// active

app.get('/charts/:chartID', function(req, res) {
  getChart(req.params.chartID, function(chartParams) {
    res.send(chartParams)
  });
});

app.get('/charts/data/:chartID', function(req, res) {
  getChart(req.params.chartID, function(chartParams) {
    getChartData(chartParams, function(rows) {
      res.send(rows)
    });
  });
});

/// in progress

app.post('/charts', function(req, res) {
  var fields = {
    tab_id: 1,
    chart_type: req.body.chartType,
    chart_title: "Key Issues",
    keywords: "economy, duffy, environment",
    publishers: "1, 2, 3"
  }
  addChart(fields, function(chart) {
    console.log(chart)
    res.json(chart)
  });
});

if (!isProduction) {

  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'
    });
  });
  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });


  proxy.on('error', function(e) {
    // Just catch it
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  var server = http.createServer(app);

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  });

} else {

  // And run the server
  app.listen(port, function () {
    console.log('Server running on port ' + port);
  });

}
