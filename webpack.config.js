var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
// var mainPath = path.resolve(__dirname, 'app', 'main.js'); // Was replaced on line#3 by the use of: var appPath = path.resolve(__dirname, 'app');
                                                             // It seems to be in wrong order, need to investigate to find out why. [BK]

var config = {
  context: __dirname,
  devtool: 'eval-source-map',                                // Initially: devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',       // The script refreshing the browser on none hot updates. Initially: ['webpack-dev-server/client?http://localhost:8080',]
    'webpack/hot/dev-server',                                // For hot style updates.
    path.resolve(appPath, 'main.js')],                       // Our application. Initially: mainPath],
  output: {


    path: buildPath,                                         // We need to give Webpack a path. It does not actually need it, because files are kept in memory in webpack-dev-server, but an
    filename: 'bundle.js',                                   // error will occur if nothing is specified. We use the buildPath as that points to where the files will eventually be bundled in production.
    publicPath: '/build/'                                    // Everything related to Webpack should go through a build path, localhost:3000/build. That makes proxying easier to handle.
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',                                       // The babel-loader gives us ES6/7 syntax and JSX transpiling out of the box.
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      loader: 'style!css'                                    // It also lets us add css-loader...
    },{
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap'                     // ... which we can now expand with sass style-loader
    }]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]        // We have to manually add the Hot Replacement plugin when running from Node
};

module.exports = config;
