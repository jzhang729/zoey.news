var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../webpack.config.js');
var path = require('path');
// var fs = require('fs');                                          // turned off: investigate!
// var mainPath = path.resolve(__dirname, '..', 'app', 'main.js');  // Not used since it is bypassed in webpack.config.js on line 3 // turning off to reflect that implication.

module.exports = function () {

  var bundleStart = null;                                           // First we fire up Webpack an pass in the configuration we created.
  var compiler = webpack(webpackConfig);
  compiler.plugin('compile', function() {                           // We give notice in the terminal when it starts bundling and set the time it started.
    console.log('Bundling...');
    bundleStart = Date.now();
  });
  compiler.plugin('done', function() {                              // We also give notice when it is done compiling, including the time it took. Nice to have.
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {                    // We need to tell Webpack to serve our bundled application from the build path.
    publicPath: '/build/',                                          // When proxying: http://localhost:3000/build -> http://localhost:8080/build
    inline: true,
    hot: true,                                                      // Configure hot replacement
    quiet: false,                                                   // The three remaining elements are concern with terminal configurations
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(3001, 'localhost', function () {                   // We fire up the development server and give notice in the terminal that we are starting the initial bundle. Originally on port 8080
    console.log('Bundling project, please wait...');
  });

};
