var path = require('path');
var webpackConf = require('peters-toolbelt').webpack;

var plugins = [];
var conf = new webpackConf({
                entry: './src',
                output: {
                    path: path.join(__dirname, '/dist'),
                    filename: 'index.js'
                },
                resolve: {
                  alias: {
                    utils: path.join(__dirname, 'src/_utils')
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
