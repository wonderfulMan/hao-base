"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
function build(webpackConfig) {
    var smp = new SpeedMeasureWebpackPlugin();
    var compiler = webpack(smp.wrap(webpackConfig));
    compiler.run(function (err, stats) {
        if (err === null) {
            console.log("\u001B[32m%s\u001B[39m", '构建完成...');
            console.log("\u001B[32m%s\u001B[39m", '构建CI镜像...');
        }
        return false;
    });
}
exports.build = build;
