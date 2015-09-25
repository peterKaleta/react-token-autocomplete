var RewirePlugin = require('rewire-webpack');
var webpack = require('webpack');
var path = require('path');

var CI = process.env.NODE_ENV !== 'development';
var WATCH = !!process.env.WATCH_TESTS;
var conf = {
  cache: true,
  devtool: 'inline-source-map',
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.jsx', '.js'],
    alias: {
      TestUtils: path.join(__dirname, '../src/_tests/utils.js'),
      utils: path.join(__dirname, '../src/_utils/')
    }
  },
  module: {
    loaders: [
      { test: /\.(js?|jsx?)$/, exclude: /node_modules|(spec\.js)$/, loader: 'isparta?{babel: { stage: 0, plugins: ["babel-plugin-rewire"] } }' },
      { test: /spec\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&plugins=babel-plugin-rewire' }
    ]
  },
  plugins: [
    new RewirePlugin(),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('radium'),
    new webpack.PrefetchPlugin('lodash')
  ],
  node: {
   net: 'empty',
   tls: 'empty',
   dns: 'empty',
   fs: 'empty'
  }
};

module.exports = function(config) {
  config.set({
    singleRun: !WATCH,
    autoWatch: true,
    browsers: [ CI ? 'Firefox' : 'PhantomJS2'],
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['mocha', 'coverage'],
    client: { mocha: { timeout: 5000 } },
    files: [ { pattern: '../tests/webpack.tests.js', watched: false } ],
    preprocessors: { '../tests/webpack.tests.js': ['webpack', 'sourcemap'] },
    webpack: conf,
    webpackServer: { noInfo: true },
    webpackMiddleware: { noInfo: true },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'lcov', subdir: 'report-lcov' },
        { type: 'text-summary' },
        { type: 'cobertura', subdir: 'cobertura'}

      ]
    }
  });
};
