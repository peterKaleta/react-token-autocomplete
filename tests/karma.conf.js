var RewirePlugin = require('rewire-webpack');
var webpack = require('webpack');
var webpackConf = require('peters-toolbelt').webpack;

var CI = !process.env.WATCH_TESTS;
var conf = new webpackConf({
  cache: true,
  resolve: {
    modulesDirectories: ['node_modules']
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
}).iNeedReact()
  .getConfig();

module.exports = function(config) {
  config.set({
    singleRun: CI,
    autoWatch: !CI,
    browsers: ['PhantomJS'],
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    frameworks: ['mocha', 'chai', 'sinon', 'es6-shim'],
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
        { type: 'text-summary' }
      ]
    }
  });
};
