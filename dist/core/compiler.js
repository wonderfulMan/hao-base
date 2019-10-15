"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var plugins_1 = require("../helper/plugins");
function compiler(webpackConfig) {
    if (webpackConfig.mode === 'development') {
        build(webpackConfig);
    }
    if (webpackConfig.mode === 'production') {
        build(webpackConfig);
    }
}
exports.compiler = compiler;
function build(webpackConfig) {
    var compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
        if (err === null) {
            console.log("\u001B[32m%s\u001B[39m", '构建完成...');
            console.log("\u001B[32m%s\u001B[39m", '构建CI镜像...');
            plugins_1.setCompilerInfoToWindow(webpackConfig);
        }
        return false;
    });
}
exports.build = build;
function server() {
}
exports.server = server;
