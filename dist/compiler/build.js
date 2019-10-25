"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
function build(webpackConfig) {
    var smp = new SpeedMeasureWebpackPlugin();
    var smpConfig = smp.wrap(webpackConfig);
    var compiler = webpack(smpConfig);
    compiler.run(function (err, stats) {
        console.log(stats);
        if (err === null) {
            console.log("\u001B[32m%s\u001B[39m", '构建完成');
        }
        return false;
    });
}
exports.build = build;
