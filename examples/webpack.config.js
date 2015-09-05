var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConf = require('peters-toolbelt').webpack;

var plugins = [];

plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './examples/index.template.html'
}));


var conf = new webpackConf({
                entry: path.join(__dirname, '/index.jsx'),
                output: {
                    path: path.join(__dirname, '/dist'),
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
            .iNeedHotDevServer()
            .getConfig();

module.exports = conf;
