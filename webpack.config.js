var path = require('path');
var webpackConf = require('peters-toolbelt').webpack;
var plugins = [];
var conf = new webpackConf({
                entry: './client',
                output: {
                    path: path.join(__dirname, '/dist'),
                    filename: 'index.js'
                },
                resolve: {
                   alias: {
                       'react': __dirname + '/node_modules/react',
                       'react/addons': __dirname + '/node_modules/react/addons',
                   },
                },
                plugins: plugins
            })
            .iNeedReact()
            .iNeedHotDevServer()
            .getConfig();

module.exports = conf;
