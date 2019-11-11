"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path_1 = require("../helper/path");
function autoGetHost() {
    var needHost = '';
    try {
        var network = os.networkInterfaces();
        for (var dev in network) {
            var iface = network[dev];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    }
    catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}
function server(webpackConfig, customConfig) {
    var host = autoGetHost();
    var devServerConfig = __assign({ host: host, port: 8080, open: true, historyApiFallback: true, overlay: false, compress: true, clientLogLevel: 'none', watchContentBase: true, hotOnly: true, hot: webpackConfig.mode === 'development', quiet: true, contentBase: path_1.default.BUIL_DIR_PATH }, customConfig.devServer);
    devServerConfig.publicPath = "http://" + devServerConfig.host + ":" + devServerConfig.port + "/";
    var devServer = new WebpackDevServer(webpack(webpackConfig), devServerConfig);
    devServer.listen(devServerConfig.port, devServerConfig.host, function (error) {
        if (error) {
            return console.log(error);
        }
        ;
        ['SIGINT', 'SIGTERM'].forEach(function (signal) {
            process.on(signal, function () {
                devServer.close(function () {
                    process.exit(0);
                });
            });
        });
    });
}
exports.server = server;
