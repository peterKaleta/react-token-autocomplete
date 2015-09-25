var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConf = require('peters-toolbelt').webpack;

var plugins = [];


var outputPath;
var addTracking;
if (process.env.BRANCH === 'gh-pages') {
  outputPath = path.join(__dirname, '../');
  addTracking = true;
} else {
  outputPath = path.join(__dirname, '/dist');
  addTracking = false;
}

plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './examples/index.template.html',
  tracking: addTracking
}));

var conf = new webpackConf({
                entry: path.join(__dirname, '/index.jsx'),
                output: {
                    path: outputPath,
                    filename: 'index.js'
                },
                resolve: {
                  alias: {
                    utils: path.join(__dirname, '../src/_utils')
                  }
                },
                plugins: plugins
            })
            .iNeedReact()
            .iNeedWebFonts()
            .iNeedSCSS()
            .iNeedHotDevServer()
            .getConfig();

module.exports = conf;
