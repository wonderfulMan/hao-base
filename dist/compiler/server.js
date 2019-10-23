"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var path_1 = require("../helper/path");
function server(webpackConfig, customConfig) {
    var devServer = new WebpackDevServer(webpack(webpackConfig), {
        port: 8000,
        open: true,
        contentBase: path_1.default.BUIL_DIR_PATH,
    });
    devServer.listen(8000, 'localhost', function (error) {
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
