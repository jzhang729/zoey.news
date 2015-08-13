var express = require('express');
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

app.use(express.static(publicPath));

app.all('/db/*', function (req, res) {
  proxy.web(req, res, {
    target: 'https://glowing-carpet-4534.firebaseio.com/'
  });
});

app.get('/detail', function(req, res) {
  var keywords = req.query.k;
  var publishers = req.query.p;
  var dates = req.query.d;

  queryDetail(keywords, publishers, dates, function(resp) {
    res.send(resp.rows);
  });
});

app.get('/test', function(req, res) {
  // var payload = {
  //   "2015-08-02": {"Globe and Mail": {"ISIS": 16, "terror": 12, "mulcair": 4}, 
  //                   "National Post": {"ISIS": 22, "terror": 10, "mulcair": 7}
  //   },
  //   "2015-08-03": {"Globe and Mail": {"ISIS": 8, "terror": 16, "mulcair": 6}, 
  //                   "National Post": {"ISIS": 2, "terror": 8, "mulcair": 5}
  //   },
  //   "2015-08-04": {"Globe and Mail": {"ISIS": 6, "terror": 4, "mulcair": 7}, 
  //                   "National Post": {"ISIS": 27, "terror": 12, "mulcair": 9}
  //   }
  // }

  var payload =
    {
      labels: ["ISIS", "terror", "RCMP"],
      datasets: [
        {
            label: "Globe and Mail",
            data: [18, 2, 32]
        },
        {
            label: "Vancouver Sun",
            data: [8, 22, 9]
        },
        {
            label: "National Post",
            data: [17, 5, 30]
        }
      ]
    }
  res.send(payload);
})

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



