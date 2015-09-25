var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConf = require('peters-toolbelt').webpack;

var plugins = [];

plugins.push(new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './examples/index.template.html'
}));

let outputPath;
if (process.env.BRANCH === 'gh-pages') {
  outputPath = __dirname;
} else {
  outputPath.join(__dirname, '/dist');
}

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
