var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');                                           // Not a part of original setup. Investigate!

var proxy = httpProxy.createProxyServer({
  changeOrigin: true,                                                 // We need to add a configuration to our proxy server, as we are now proxying outside localhost.
  ws: true
}); 
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;                    // Originally: var port = isProduction ? 8080 : 3000; // change has been made do to herokus not supporting 8080 port. Not really applicable in out case.
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));                                  // We point to our static assets.

app.all('/db/*', function (req, res) {                                // If for development only, put it in the "if" block below.
  proxy.web(req, res, {
    target: 'https://zoey.firebaseio.com/'
  });
});

if (!isProduction) {                                                  // We only want to run the workflow when not in production.

  var bundle = require('./server/bundle.js');                         // We require the bundler inside the if block because it is only needed in a development environment.
  bundle();
  app.all('/build/*', function (req, res) {                           // Any requests to localhost:3000/build is proxied to webpack-dev-server.
    proxy.web(req, res, {
        target: 'http://127.0.0.1:3001'                               // Originally: target: 'http://localhost:8080'
    });
  });
  app.all('/socket.io*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001'
    });
  });


  proxy.on('error', function(e) {                                     // It is important to catch any errors from the proxy or the server will crash. An example of this is connecting to the server when webpack is bundling.
    console.log('Could not connect to proxy, please try again...');   // Added this for clarity reasons.
  });

  var server = http.createServer(app);                                // We need to use basic HTTP service to proxy websocket requests from webpack. This along with server.on and server.listen were added vs the original.

  server.on('upgrade', function (req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function () {
    console.log('Server running on port ' + port);
  }); 

} else {

  app.listen(port, function () {                                      // And run the server
    console.log('Server running on port ' + port);
  });

}



